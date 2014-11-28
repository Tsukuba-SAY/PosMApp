<?php
// DBのuserdataが置いてあるのでinclude
include "/etc/poslog_db_user_data.php";

// $json = file_get_contents("php://input");
// $received_data = json_decode($json, true);


$mysqli = new mysqli($url, $user, $password, $db);

if (mysqli_connect_error()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	exit();
}

$mysqli->set_charset("utf-8");

$stmt = $mysqli->prepare("INSERT INTO log VALUES (NULL, ?, ?)");
$stmt->bind_param("ss", $uid, $data);

// $uid = $received_data["uid"];
// $logdata = $received_data["logdata"];
$uid = $_GET["uid"];
$logdata = $_GET["logdata"];

error_log($logdata);

foreach ($logdata as $value) {	
	$data = json_encode($value);
	$stmt->execute();
}

$stmt->close();
$mysqli->close();

header('Content-Type: text/javascript; charset=utf-8');
echo sprintf("callback(%s)", json_encode($received_data));


?>