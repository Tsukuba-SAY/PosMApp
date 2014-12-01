<?php
// DBのuserdataが置いてあるのでinclude
include "/etc/poslog_db_user_data.php";

$json = file_get_contents("php://input");
$json_data = json_decode($json);

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

header('Content-Type: text/javascript; charset=utf-8');
echo sprintf($json_data);

?>