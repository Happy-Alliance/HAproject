<?php
include("sql_connect.php");
session_start();

$user = $_SESSION["name"];

$Case_id = $_POST['Case_id'];
$Id = $_POST['Id'];
$Case_pid = $_POST['Case_pid'];
$Case_grade = $_POST['Case_grade'];
@$Case_stage = $_POST['Case_stage'];

$sqlUpdate = "UPDATE `placement_case` SET `Case_grade` = '$Case_grade' ,`Case_stage` = '$Case_stage' ,`Update_name` = '$user', `Update_date` = NOW() WHERE `placement_case`.`Case_id` = '$Case_id' AND `placement_case`.`Id` = '$Id' AND `placement_case`.`Case_pid` = '$Case_pid' ORDER BY `placement_case`.`Create_date` ASC LIMIT 1;";

if(mysqli_query($conn, $sqlUpdate)){
    echo true;
}else{
    echo false;
}
mysqli_close($conn);

?>