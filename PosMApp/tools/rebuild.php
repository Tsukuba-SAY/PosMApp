<?php
// Script for webhooks in GitHub and Slack
// Author: Shota Furuya
// Date: 2014/11/10

define("ADDRESS", "104.236.24.141");
define("USER", "root");
define("PASSWORD", "weloveposter");
define("SECRET_KEY", "saysaysay");

$data_github = json_decode($_POST["payload"], true);
header("Content-Type: application/json");

$slack_webhook_url = "https://hooks.slack.com/services/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"; 

if (isset($_GET["key"]) && $_GET["key"] === SECRET_KEY) {

  $scon = ssh2_connect(ADDRESS, 22);
  ssh2_auth_password($scon, USER, PASSWORD);
  
  $stdio_stream = "";
  $stdio_stream .= ssh2_exec($scon, "cd /PosMAppBuild");
  $stdio_stream .= ssh2_exec($scon, "pwd");
  $stdio_stream .= ssh2_exec($scon, "git pull");
  $stdio_stream .= ssh2_exec($scon, "git status");
  $stdio_stream .= ssh2_exec($scon, "httpd -k restart");
  $stdio_stream .= ssh2_exec($scon, "echo 'rebuild done!'");

  $payload = array("text" => ADDRESS." : Rebuild DONE");

  echo "Rebuild DONE";

} else {

  $payload = array("text" => ADDRESS." : Authentication FAILED");

  echo "Authentication FAILED";
}


$options = array(
  "http" => array(
    "method" => "POST",
    "content" => json_encode($payload),
    "header" => "Content-Type: application/json\r\n".
                "Accept: application/json\r\n"
  )
);
$context = stream_context_create($options);
$result = file_get_contents($slack_webhook_url, false, $context);
$result = json_decode($result);
echo $result;


?>
