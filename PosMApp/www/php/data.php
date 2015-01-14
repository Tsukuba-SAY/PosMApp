<?php 
  header('Content-type: text/plain; charset=UTF-8');
  include "/etc/poslog_db_user_data.php";

  $mysqli = new mysqli($url, $user, $password, $db);

  if (mysqli_connect_error()) {
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
	exit();
  }

  $mysqli->set_charset("utf8");

  $sql = <<<"EOT"
    select s.poster as poster, p.sessionid as sessionid, p.title as title, s.frequency as frequency
    from PosterInfo p left outer join (

     select poster, sum(score) as frequency
     from (
       select l.uid, json_extract(json_extract(l.data,'attribute'),'posterid') as poster,case when sum(s.score)>=0 then sum(s.score) else 0 end as score
       from  log l, actionscore s
       where json_extract(l.data,'action') =  s.action 
       group by json_extract(json_extract(l.data,'attribute'),'posterid'), l.uid
     ) p
     group by poster
    
   ) s
   on s.poster = p.id
   order by s.frequency desc;

EOT;

  $result = $mysqli->query($sql);

  $rows = array();
  while ($r = $result->fetch_assoc()) {
     $rows[] = $r;
  }
  print json_encode($rows);

?>
