<?php

function debug_to_console($data) {
  $output = $data;
  if (is_array($output))
      $output = implode(',', $output);

  echo "<script>console.log('Debug Objects: " . $output . "' );</script>";
}
debug_to_console("firstsubmit");
include_once("database.php");
$postdata = file_get_contents("php://input");
debug_to_console("beforeisset");
if(isset($postdata) && !empty($postdata)) {
  debug_to_console("afterisset");
  $request = json_decode($postdata);
  $fname = mysqli_real_escape_string($mysqli, trim($request->fname));
  $lname = mysqli_real_escape_string($mysqli, trim($request->lname));
  $phoneno = mysqli_real_escape_string($mysqli, trim($request->phoneno));
  $email = mysqli_real_escape_string($mysqli, trim($request->email));
  $sdate = mysqli_real_escape_string($mysqli, trim($request->sdate));
  $edate = mysqli_real_escape_string($mysqli, trim($request->edate));
  $roomid = mysqli_real_escape_string($mysqli, trim($request->roomid));
  $sql = "INSERT INTO roombooking(Firstname,Lastname,PhoneNumber,Email,Startdate,Enddate,RoomId) VALUES ('$fname','$lname',' $phoneno','$email','$sdate','$edate','$roomid')";
  if(mysqli_query($mysqli, $sql)) {
    echo "Record Inserted";
  }
  else {
    echo "Record Not Inserted";
  }
}

?>