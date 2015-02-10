<?php 
header("Access-Control-Allow-Origin: *");

//$content = mb_convert_encoding(file_get_contents("C:\\xampp\\htdocs\\json\\JSON.json"), 'UTF-8', 'auto');

$contentstr = file_get_contents("author.json");

//$content = json_decode($contentstr,JSON_UNESCAPED_UNICODE);

//$content = mb_convert_encoding($content, "UTF-8", "auto");

//printf($content);

//$json = json_encode($content,JSON_UNESCAPED_UNICODE);

//$json = iconv("shift-jis","UTF-8//IGNORE",$json); 

//printf($json);

echo $contentstr;

?>
