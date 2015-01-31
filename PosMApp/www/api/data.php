<?php 

header("Access-Control-Allow-Origin: *");
$contentstr = file_get_contents("data.json");
echo $contentstr;

?>
