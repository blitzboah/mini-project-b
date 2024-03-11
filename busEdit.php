<?php
require 'connection.php';
session_start();

if (isset($_SESSION['email'])) {
    $loggedInUserEmail = $_SESSION['email'];
} else {
    header('Location: login.php'); // Redirect to the login page if not logged in
    exit();
}

$editid = $_GET['bedid'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vin =$_POST['vehicleRegistrationNumber'];
    $dop =$_POST['permitExpiry'];

    $query = "UPDATE `businfo` SET `bus_number`=?, `bus_permit`=? WHERE `bus_id`=?";
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'ssi', $vin, $dop, $editid);
        if (mysqli_stmt_execute($stmt)) {
            echo "Record with ID $editid has been updated successfully.";
        } else {
            echo "Error updating the record: " . mysqli_error($conn);
        }
        mysqli_stmt_close($stmt);
    } else {
        echo "Error preparing the update statement: " . mysqli_error($conn);
    }
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>BusInfo</title>
  <link rel="stylesheet" type="text/css" href="css/driverReg.css">
</head>
<body>
  <div class="header">
  </div>
  <div class="container">
  <div class="login-form">
  <form method="post">
    <div class="form-header">
    <h2>Update Your Driver:</h2>
</div>
    
    <div class="input-group">
        <input type="hidden" name="busId" value="<?php echo $editid; ?>">
    </div>
  	<div class="input-group">
  	  <label>Vehicle Registration Number:</label>
  	  <input type="text" name="vehicleRegistrationNumber">
  	</div>
  	<div class="input-group">
  	  <label>Permit Expiry:</label>
  	  <input type="date" name="permitExpiry">
  	</div>
  	<div class="input-group">
  	  <button type="submit" class="btn" name="upd_bus">Update</button>
  	</div>
  </form>
  </div>
  </div>
</body>
</html>
