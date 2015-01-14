<?php
// Script for webhooks in GitHub and Slack
// Author: Shota Furuya
// Date: 2015/01/14

header("Access-Control-Allow-Origin: *");
$payload_github_json = file_get_contents("php://input");
$payload_github = json_decode($payload_github_json, true);
header("Content-Type: application/json");

$rebuild_result = shell_exec("sudo /rebuild.sh");

echo $payload_github["ref"];
echo $rebuild_result;

if ($payload_github["ref"] === "refs/heads/develop") {

  $payload = array("text" => $rebuild_result);

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

}

?>
