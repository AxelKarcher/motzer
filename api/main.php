<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");

  $arr = ['queue', 'concert', 'musique', 'maison'];
  $elem = $arr[array_rand($arr)];

  echo ($elem);
?>