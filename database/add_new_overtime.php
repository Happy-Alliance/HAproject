<?php
session_start();
//連接資料庫
//只要此頁面上有用到連接MySQL就要include它
include("sql_connect.php");

$Rec_year = $_REQUEST['Rec_year'];
$Fillin_date = $_REQUEST['Fillin_date'];

$Overtime_date = $_REQUEST['Overtime_date'];
$Reason = $_REQUEST['Reason'];
$Overtime_hours = $_REQUEST['Overtime_hours'];


@$Free_date = $_REQUEST['Free_date'];
@$Free_hours = $_REQUEST['Free_hours'];


@$Supervise = $_REQUEST['Supervise'];
@$Checker = $_REQUEST['Checker'];


$user = $_SESSION['name'];
$user_acc = $_SESSION['Account'];

// 查詢 帳號的Resume_id
$select_id_num = "SELECT `Resume_id` FROM `user_info` WHERE `Account` = '$user_acc' AND `Name` = '$user';";

$find_id_num = mysqli_query($conn,$select_id_num);
$id_num = mysqli_fetch_row($find_id_num);

// 查詢 id、名字
$select_user_data_num = "SELECT `Id`, `Name` FROM `resume` WHERE `Id` = '$id_num[0]';";

$find_user_data_num = mysqli_query($conn,$select_user_data_num);
$user_data_num = mysqli_fetch_row($find_user_data_num);



$sql = "INSERT INTO `overtime` (`Resume_id`, `Resume_name`, 
`Rec_year`, `Fillin_date`, 
`Overtime_date`, 
`Reason`, 
`Overtime_hours`, 
`Free_date`, `Free_hours`, 
`Allow_status`, 
`Create_date`, `Create_name`, 
`Supervise`,`Checker`) VALUES
 ('$user_data_num[0]', '$user_data_num[1]',
 '$Rec_year', '$Fillin_date', 
 '$Overtime_date', 
 '$Reason', 
 '$Overtime_hours', 
 '$Free_date', '$Free_hours', 
 '審核中', 
 NOW(), '$user',  
 '$Supervise', '$Checker');";
if (mysqli_query($conn, $sql)) {
    echo true;
} else {
    echo false;
}

mysqli_close($conn);
