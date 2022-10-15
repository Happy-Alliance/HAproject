<?php session_start(); ?>
<?php
//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
include("sql_connect.php");

@$arr_id = $_REQUEST['arr_id'];
@$Report_type = $_REQUEST['Report_type'];
@$Report_title = $_REQUEST['Report_title'];
@$Report_date = $_REQUEST['Report_date'];
@$Remark = $_REQUEST['Remark'];
@$Report_year = $_REQUEST['Report_year'];

$user = $_SESSION['name'];


// 上傳報表路徑
@$file_dir = "../accounting_record_report/";

@$file = "";

@$sql_file_upload = "";

// 無該檔案資料夾則建立
if (!is_dir($file_dir)) {
    mkdir($file_dir, 0777, true);
}

// 判斷報表上傳
if (isset($_FILES["report_files0"]))
{
    @$file_name = $_FILES["report_files0"]["name"];
    @$file = "../accounting_record_report/" . $_FILES["report_files0"]["name"];

    

    if ($_FILES["report_files0"]["error"] > 0) {

        echo false;
    } else {
        //設定檔案上傳路徑，選擇指定資料夾
        move_uploaded_file(
            $_FILES["report_files0"]["tmp_name"],
            "../accounting_record_report/" . $_FILES["report_files0"]["name"]
        );
    }

    $sql_file_upload = ",`Report_path`= '$file', `Report_name` = '$file_name'";
}

@$sql = "UPDATE `accounting_record_report` SET `Report_year` = '$Report_year', `Report_type` = '$Report_type'
".$sql_file_upload."
, `Report_title` = '$Report_title', `Report_date` = '$Report_date'
, `Remark` = '$Remark', `Update_date` = NOW(), `Update_name` = '$user'
WHERE `Id` = '$arr_id' LIMIT 1;";

if (mysqli_multi_query($conn, $sql)) {
    echo true;
    // echo $sql;
} else {
    echo "{$sql} 語法執行失敗，錯誤訊息：" . mysqli_error($conn);
}


mysqli_close($conn);
?>


