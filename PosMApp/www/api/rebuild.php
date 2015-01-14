<?php
// Script for webhooks in GitHub and Slack
// Author: Shota Furuya
// Date: 2015/01/14

header("Access-Control-Allow-Origin: *");
$payload_github = json_decode($_POST["payload"], true);
header("Content-Type: application/json");

$rebuild_result = shell_exec("/root/rebuild.sh");
echo $rebuild_result;

$payload = array("text" => "Rebuild DONE");

$slack_webhook_url = "https://hooks.slack.com/services/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"; 
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
