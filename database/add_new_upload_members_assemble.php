<?php session_start(); ?>
<?php
//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
include("sql_connect.php");

@$upload_content = json_encode($_REQUEST['upload_content'], JSON_UNESCAPED_UNICODE);
@$year = $_REQUEST['year'];

@$file_dir = "../members_assemble/upload/";

@$file = "../members_assemble/upload/" . $_FILES["file4"]["name"];

@$title = $_REQUEST['title'];
@$rec_type = $_REQUEST['rec_type'];

@$signer = $_REQUEST['signer'];
@$rec_date_time = $_REQUEST['rec_date_time'];

$user = $_SESSION['name'];


if (!is_dir($file_dir)) {
    mkdir($file_dir, 0777, true);
}


if (isset($_FILES["file4"])) {

    // if ($_FILES["file4"]["type"] == "application/pdf") {
    //     if ($_FILES["file4"]["error"] > 0) {
    //         echo false;
    //     } else {
    //     //設定檔案上傳路徑，選擇指定資料夾
    //         move_uploaded_file(
    //             $_FILES["file4"]["tmp_name"],
    //             "../members_assemble/upload/" . $_FILES["file4"]["name"]
    //         );
    //     }
    // }
    // else
    // {
    //     echo false;
    // }

    if ($_FILES["file4"]["error"] > 0) {

        echo false;
    } else {
        //設定檔案上傳路徑，選擇指定資料夾
        move_uploaded_file(
            $_FILES["file4"]["tmp_name"],
            "../members_assemble/upload/" . $_FILES["file4"]["name"]
        );
    }
}

if (isset($_REQUEST['File_name'])) {
    @$file = "../members_assemble/upload/" . $_REQUEST['File_name'];
} else {
    @$file = "../members_assemble/upload/" . $_FILES["file4"]["name"];
}

if (isset($_FILES["file4"]) || isset($_REQUEST['File_name'])) 
{
    $select_id_num = "SELECT MAX(Id) FROM `members_assemble` ORDER BY `members_assemble`.`Create_date` ASC LIMIT 1;";

    $find_id_num = mysqli_query($conn,$select_id_num);
    $id_num = mysqli_fetch_row($find_id_num);

    if($id_num[0]>0)
    {
        $ma_id = (int)$id_num[0] + 1;
    }
    else
    {
        $ma_id = 0;
    }

    $url = 'members_assemble_detail.php?year='.$year.'&id='.$ma_id.'&ma_id='.$ma_id.'&rec_type='.$rec_type .'';


    $start_datetime = date("Y-m-d H:s");
    $end_datetime = date("Y-m-d H:s" ,strtotime("+2 day"));

    // if($_FILES["file4"]["name"] != null && $_FILES["file4"]["type"] == "application/pdf"){
    if (@$_FILES["file4"]["name"] != null || isset($_REQUEST['File_name'])) {
        $sql = "INSERT INTO `members_assemble` (`Id`, `Year`, `upload_content`, `file_path`, `Create_date`, `Create_name`, `Supervise`) VALUES 
            ($ma_id, '$year', '$upload_content', '$file', NOW(), '$user', '$signer');";

        // $sql .= "INSERT INTO `calendar` (`title`,`description`,`start`, `end`, `publisher`) VALUES ('$title','$url','$start_datetime', '$end_datetime', '$user')";
        $sql .= "INSERT INTO `signature_notice` (`Record_id`, `Title`,`Url`,`Timestamp`, `Assign`, `Signer`, `Sign_state`, `Type`, `Create_date`, `Create_name`) 
        VALUES ($ma_id, '$title','$url','$rec_date_time', '$user', '$signer', '未簽核', 'members_assemble', Now(), '$user')";

        if (mysqli_multi_query($conn, $sql)) {
            echo true;
        } else {
            echo "{$sql} 語法執行失敗，錯誤訊息：" . mysqli_error($conn);
        }
    } else {
        echo false;
    }
} else {
    echo false;
}



mysqli_close($conn);
?>