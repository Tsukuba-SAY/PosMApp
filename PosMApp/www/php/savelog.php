<?php
// DBのuserdataが置いてあるのでinclude
include "/etc/poslog_db_user_data.php";

$json = file_get_contents("php://input");
$data_array = json_decode($json);

$mysqli = new mysqli($url, $user, $password, $db);

if (mysqli_connect_error()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	exit();
}

$mysqli->set_charset("utf-8");

$stmt = $mysqli->prepare("INSERT INTO log VALUES (NULL, ?, ?)");
$stmt->bind_param("ss", $uid, $data);

foreach ($data_array as $data_json) {	
	$data = json_decode($data_json);
	$uid = $data->uid;
	$data = json_encode($data);

	$stmt->execute();
}

$stmt->close();
$mysqli->close();

?>