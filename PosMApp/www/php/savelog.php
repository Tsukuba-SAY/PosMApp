<?php
// DBのuserdataが置いてあるのでinclude
include "/etc/poslog_db_user_data.php";

$json_data = $_POST;

$mysqli = new mysqli($url, $user, $password, $db);

if (mysqli_connect_error()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	exit();
}

$mysqli->set_charset("utf-8");

$stmt = $mysqli->prepare("INSERT INTO log (id, uid, timestamp, data) VALUES (NULL, ?, ?, ?)");
$stmt->bind_param("sss", $uid, $timestamp, $data);

$uid = $json_data["uid"];
$logdata = $json_data["logdata"];

foreach ($logdata as $value) {	
	$timestamp = $value["timestamp"];
	$data = json_encode($value);
	$stmt->execute();
}

$stmt->close();
$mysqli->close();

header("Access-Control-Allow-Origin:*");
header('Content-Type: text/javascript; charset=utf-8');
echo json_encode($json_data);

?>