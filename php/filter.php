<?php
header('Content-Type: application/json');

include_once("database.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata)){
	$sdate = mysqli_real_escape_string($mysqli, trim($request->sdate));
	$edate = mysqli_real_escape_string($mysqli, trim($request->edate));
	$sql = "SELECT DISTINCT RoomId FROM roombooking where ('$sdate' BETWEEN Startdate AND Enddate) OR ('$edate' BETWEEN Startdate AND Enddate) OR (Startdate BETWEEN '$sdate' AND '$edate') OR (Enddate BETWEEN '$sdate' AND '$edate')";
	if($result = mysqli_query($mysqli,$sql)) {
		$num = mysqli_num_rows($result);
		$rows = array();
		while($row = mysqli_fetch_assoc($result)) {
		$rows[] = $row["RoomId"];
		}
		$jsonData = json_encode($rows);
		echo $jsonData;
	}
	else {
		http_response_code(404);
	}
}

?>