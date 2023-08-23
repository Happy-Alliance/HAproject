<?php
session_start();
//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
include("sql_connect.php");

// $Invoice_year = (int)$_REQUEST['year'];
// $Invoice_month = (int)$_REQUEST['month'];

$Form_class = $_REQUEST['Form_class'];
$Invoice_year = (int)$_REQUEST['Invoice_year'];
$Invoice_month = (int)$_REQUEST['Invoice_month'];

$Invoice_type = $_REQUEST['Invoice_type'];
$Amount = $_REQUEST['Amount'];

$Remark = $_REQUEST['Remark'];

$user = $_SESSION['name'];


// 上傳報表路徑
@$file_dir = "../accounting_record_cash/" . $_REQUEST['Invoice_year'] . "_data/upload/";

$file_0 = "";

$file_0_arr = array();

if (!is_dir($file_dir)) {
    mkdir($file_dir, 0777, true);
}

if (isset($_FILES["arc_files"]))
{
    @$file_0_date = date("Y-m-d");

    for ($a = 0; $a < count($_FILES["arc_files"]["name"]); $a++)
    {
        @$file_0 = $file_dir .$_FILES["arc_files"]["name"][$a];
    
        if ($_FILES["arc_files"]["error"][$a] > 0) {
            echo false;
        } else {
            //設定檔案上傳路徑，選擇指定資料夾
            move_uploaded_file(
                $_FILES["arc_files"]["tmp_name"][$a],
                $file_0
            );
        }

        array_push($file_0_arr, $file_0);
    }

    $file_0_arr = json_encode($file_0_arr,JSON_UNESCAPED_UNICODE);
}

if(empty($file_0_arr))
{
    $file_0_arr = implode($file_0_arr);
}


$Income_sum = 0;
$Cost_sum = 0;
$Last_pb = 0;

$select_id_num = "SELECT MAX(Id) FROM `accounting_record_cash_v2` ORDER BY `accounting_record_cash_v2`.`Create_date` ASC LIMIT 1;";

$find_id_num = mysqli_query($conn,$select_id_num);
$id_num = mysqli_fetch_row($find_id_num);

if($id_num[0]>0)
{
    $arc_id = (int)$id_num[0] + 1;
}
else
{
    $arc_id = 1;
}

    if($Form_class=="兒少單據")
    {
        $sql = "INSERT INTO `accounting_record_cash_v2` (`Id`, `Year`, `Month`,`Form_class`, `Invoice_type`, `Amount`, `Remark`, `Files_path`, `Create_date`, `Create_name`) VALUES
        ($arc_id, $Invoice_year, $Invoice_month, '$Form_class',
        '$Invoice_type', '$Amount', '$Remark', '$file_0_arr', NOW(), '$user');";
    }
    elseif ($Form_class=="轉帳") {
        $sql = "INSERT INTO `accounting_record_cash_v2` (`Id`, `Year`, `Month`,`Form_class`, `Invoice_type`, `Amount`, `Remark`, `Files_path`, `Create_date`, `Create_name`) VALUES
        ($arc_id, $Invoice_year, $Invoice_month, '$Form_class',
        '$Invoice_type', '$Amount', '$Remark', '$file_0_arr', NOW(), '$user');";
    }
    elseif ($Form_class=="日記帳") {
        // 1.找到本期的收支金額，計算該期總收入和總支出
        // 2.找到上期的收支金額，計算上期結餘金額
        // 3.尋找本期資料是否已登入accounting_record_cash_balance資料庫中，有的話UPDATE修改數據，若無INSERT新增數據
        // 4.最後將該筆零用金紀錄新增至accounting_record_cash資料庫中
        // P.S.有關金錢紀錄計算建議使用number_format

        $select_amount = "SELECT `Invoice_type`,`Amount` FROM `accounting_record_cash_v2` WHERE `Form_class`='日記帳' AND `Year`='$Invoice_year' AND `Month`='$Invoice_month';";

        $datas = array();

        $find_rec = mysqli_query($conn,$select_amount);

        if (mysqli_num_rows($find_rec) > 0)
        {
            while ($row = mysqli_fetch_assoc($find_rec))
            {
            $datas[] = $row;
            }
        }
        mysqli_free_result($find_rec);

        foreach($datas as $item) {
            if($item['Invoice_type']=="支出")
            {
                $Cost_sum+=number_format($item['Amount'], 2, '.', '');
            }
            elseif($item['Invoice_type']=="收入")
            {
                $Income_sum+=number_format($item['Amount'], 2, '.', '');
            }
        }

        $last_month = ($Invoice_month - 1);

        $select_amount = "SELECT `Invoice_type`,`Amount` FROM `accounting_record_cash_v2` WHERE `Form_class`='日記帳' AND `Year`='$Invoice_year' AND `Month`='$last_month';";

        $datas2 = array();

        $find_rec = mysqli_query($conn,$select_amount);

        if (mysqli_num_rows($find_rec) > 0)
        {
            while ($row = mysqli_fetch_assoc($find_rec))
            {
            $datas2[] = $row;
            }
        }
        mysqli_free_result($find_rec);


        foreach($datas2 as $item) {
            if($item['Invoice_type']=="支出")
            {
                $Last_pb-=number_format($item['Amount'], 2, '.', '');
            }
            elseif($item['Invoice_type']=="收入")
            {
                $Last_pb+=number_format($item['Amount'], 2, '.', '');
            }
        }

        // 找出有無紀錄
        $select_rec = "SELECT `Year`, `Month` FROM `accounting_record_cash_balance_v2` WHERE `Year`='$Invoice_year' AND `Month`='$Invoice_month'  GROUP BY `accounting_record_cash_balance_v2`.`Year`, `accounting_record_cash_balance_v2`.`Month`;";

        $find_rec = mysqli_query($conn,$select_rec);
        $rec = mysqli_fetch_row($find_rec);

        if($Invoice_type=="支出")
        {
            $Cost_sum += number_format($Amount, 2, '.', '');
        }
        elseif($Invoice_type=="收入")
        {
            $Income_sum += number_format($Amount, 2, '.', '');
        }

        if(!empty($rec))
        {
            $other_implement = "UPDATE `accounting_record_cash_balance_v2` SET `Income_sum`=$Income_sum, `Cost_sum`=$Cost_sum, `Last_pb`=$Last_pb, `Update_date`=NOW(), `Update_name`='$user' WHERE `Year`='$Invoice_year' AND `Month`='$Invoice_month' ORDER BY `accounting_record_cash_balance_v2`.`Create_date` ASC;";
        }
        else
        {
            $other_implement = "INSERT INTO `accounting_record_cash_balance_v2` (`Year`, `Month`, `Income_sum`, `Cost_sum`, `Last_pb`, `Create_date`, `Create_name`) VALUES
            ($Invoice_year, $Invoice_month, $Income_sum, $Cost_sum, $Last_pb, NOW(), '$user');";
        }

        $sql = "INSERT INTO `accounting_record_cash_v2` (`Id`, `Year`, `Month`,`Form_class`, `Invoice_type`, `Amount`, `Remark`, `Files_path`, `Create_date`, `Create_name`) VALUES
        ($arc_id, $Invoice_year, $Invoice_month, '$Form_class',
        '$Invoice_type', '$Amount', '$Remark', '$file_0_arr', NOW(), '$user');";

        $sql .= $other_implement;
    }
    else
    {
        return false;
    }


	if(mysqli_multi_query($conn,$sql)){
        echo true;
    }else{
        echo "{$sql} 語法執行失敗，錯誤訊息：" . mysqli_error($conn);
    }

mysqli_close($conn);
?>