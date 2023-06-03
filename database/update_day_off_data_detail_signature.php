<?php
session_start();
include("sql_connect.php");
$day_off_id = $_POST['day_off_id'];
$sign_msg = $_POST['sign_msg'];
$sign_type = $_POST['sign_type'];

$user = $_SESSION['name'];


/*  base64格式编码转换为图片并保存对应文件夹 */
$base64_content = $_POST['src_data'];
// echo $base64_content;die;

//截取数据为数组
$base64_content = explode(',', $base64_content);

//生成目录：demo所在根目录下
// $new_file = "./".date('Ymd',time())."/";  
// $new_file = "../signature".date('Ymd',time())."/";  
$new_file = "../signature/";
if (!file_exists($new_file)) {
    //检查是否有该文件夹，如果没有就创建，并给予最高权限  
    mkdir($new_file, 0700);
}

//文件后缀名
$type = 'png';
//生成文件名：相对路径
$new_file = $new_file . time() . ".$type";

switch ($sign_type) {
    case 'director':
        $sql_str = " `Director` = '$user', `Director_signature` = '$new_file', `Director_sign_msg` = '$sign_msg',`Director_sign_time` = NOW()";
        break;
    case 'supervise':
        $sql_str = " `Supervise` = '$user', `Supervise_signature` = '$new_file', `Supervise_sign_msg` = '$sign_msg',`Supervise_sign_time` = NOW()";
        break;
    case 'job_agent':
        $sql_str = " `Job_agent` = '$user', `Job_agent_signature` = '$new_file', `Job_agent_sign_msg` = '$sign_msg',`Job_agent_sign_time` = NOW()";
        break;
    default:
        return false;
        break;
}

//转换为图片文件
if (file_put_contents($new_file, base64_decode($base64_content[1]))) {
    $sqlUpdate = "UPDATE `day_off_v2` SET $sql_str WHERE `Id` = '$day_off_id' ORDER BY `day_off_v2`.`Create_date` ASC LIMIT 1;";
    if (mysqli_query($conn, $sqlUpdate)) {
        echo true;
    } else {
        echo false;
        echo "{$note} 語法執行失敗，錯誤訊息：" . mysqli_error($conn);
    }
} else {
    return false;
}





mysqli_close($conn);
