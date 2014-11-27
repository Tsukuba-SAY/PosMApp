<?php
// Script for webhooks in GitHub and Slack
// Author: Shota Furuya
// Date: 2014/11/25 -

// define("ADDRESS", "");
// define("USER", "root");
// define("PASSWORD", "");
// define("SECRET_KEY", "");

$json = file_get_contents("php://input");
$data = json_decode($json);

?>