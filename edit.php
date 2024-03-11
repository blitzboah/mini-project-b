<?php
require 'connection.php';
session_start();

if (isset($_SESSION['email'])) {
    $loggedInUserEmail = $_SESSION['email'];
} else {
    header('Location: login.php'); 
    exit();
}

$editid = $_GET['edid'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['driverName'];
    $doe = $_POST['dateOfExpiry'];
    $doj = $_POST['dateOfJoining'];

    $query = "UPDATE `driverinfo` SET `dri_name`=?, `dri_licenseExpiry`=?, `dri_joiningDate`=? WHERE `driver_id`=?";
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'sssi', $name, $doe, $doj, $editid);
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
<?php
$query = "SELECT * FROM driverinfo WHERE driver_id = $editid";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
?>
<!DOCTYPE html>
<html>
<head>
  <title>BusInfo</title>
  <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&family=Ubuntu&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
      href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Cabin:wght@600;700&family=Dosis:wght@200;300;400;500;600;700;800&family=Handlee&family=Lobster&family=Playpen+Sans:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
  <link rel="stylesheet" type="text/css" href="css/driverReg.css">
  <style>
      body {
        background-color: #454545;
        font-family: "Montserrat";
      }
      .input-field{
        height:50px;
      }
      input{
        font-family:'Montserrat';
        padding:3px;
      }
    </style>
</head>
<body>
  <div class="header">
  </div>
  <div class="container" style="margin: 50px">
      <div class="login-form">
        <form method="post" enctype="multipart/form-data">
          <div>
            <div class="form-header">
              <h2>Register Your Driver:</h2>
            </div>
            <br />
            <div class="input-group">
              <label style="margin-right: 10px">Registration Number:</label>
            </div>
            <div class="input-field">
              <input type="text" name="registrationNumber" readonly size="90" value="<?php echo $row['dri_regnumber']?>"/>
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Driver Name:</label>
            </div>
            <div class="input-field">
              <input type="text" name="driverName" readonly size="90" value="<?php echo $row['dri_name']?>"/>
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Driver Address:</label>
            </div>
            <div class="input-field">
              <input
                type="text"
                name="driverAddress"
                rows="2"
                cols="30"
                value="<?php echo $row['dri_address']?>"
                required
                size="90"
              />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Driver Phone Number:</label>
            </div>
            <div class="input-field">
              <input type="text" name="driverPhone" required size="90"  value="<?php echo $row['dri_phonenumber']?>"/>
            </div>

            <div class="input-group">
              <label style="margin-right: 10px">License Number:</label>
            </div>
            <div class="input-field">
              <input
                type="text"
                id="licenseNumber"
                name="licenseNumber"
                required
                size="90"
                value="<?php echo $row['dri_licensenumber']?>"
                readonly
              />
            </div>

            <div class="input-group">
              <label style="margin-right: 10px"
                >Date of Expiry of license:</label
              >
            </div>
            <div>
              <input
                type="date"
                name="dateOfExpiry"
                value="<?php echo $row['dri_licenseExpiry']?>"
                min="<?php echo date('Y-m-d'); ?>"
                required
                style="margin-left:10px"
              />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Date of Joining:</label>
            </div>
            <div>
              <input
                type="date"
                name="dateOfJoining"
                max="<?php echo date('Y-m-d'); ?>"
                value="<?php echo $row['dri_joiningDate']?>"
                readonly
                style="margin-left:10px"
              />
            </div>
            <br />
            <div class="input-group">
              <button type="submit" name="reg_driver">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
</body>
</html>
