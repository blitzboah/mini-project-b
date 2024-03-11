<?php
require 'connection.php';
session_start();

if (isset($_SESSION['email'])) {
    $loggedInUserEmail = $_SESSION['email'];
} else {
    header('Location: login.php'); 
    exit();
}

$viewid = $_GET['vid'];

$query = "SELECT * FROM driverinfo WHERE driver_id = $viewid";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
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
    <style>
      body {
        height: 97.5vh;
        margin:0;
        font-family: "Montserrat";
      }
      .profile-grid {
        height: 100vh;
        display: grid;
        grid-row-gap: 20px;
        grid-column-gap: 20px;
        background-color: #454545;
        padding: 30px;
      }
      .profile-grid > div {
        background-color: #d6d46d;
        border-radius: 20px;
        text-align: center;
        display: flex;
        justify-content:center;
        align-items:center;
      }
      .driver-name {
        font-size: 3rem;
        font-weight: 500;
        grid-area: 1/1/2/4;
        padding: 25px;
      }
      .driver-photo {
        grid-area: 2/1/4/2;
      }
      .license-photo {
        grid-area: 4/1/6/2;
        padding: 25px;
      }
      .license-number {
        grid-area: 2/2/3/3;
        padding: 25px;
      }
      .registration-number {
        grid-area: 2/3/3/4;
      }
      .date-of-expiry {
        grid-area: 5/2/5/3;
        padding: 25px;
      }
      .date-of-joining {
        grid-area: 5/3/5/4;
        padding: 25px;
      }
      .driver-photo{
        display: flex;
        justify-content:center;
        align-items:center;
      }
      .driver-address{
        grid-area:3/2/5/3;
      }
      img{
        border-radius:10px;
      }
    </style>
  </head>
  <body>
    <div class="profile-grid">
      <div class="driver-name"><?php echo $row['dri_name']?></div>
      <div class="driver-photo"><div class="image"><img src="<?php echo $row['dri_photo']?>" height="100px" width="100px" class="dri-photo"></div></div>
      <div class="license-photo"><img src="<?php echo $row['dri_licensephoto']?>" height="150px" width="250px"></div>
      <div class="license-number"><h5>License Number</h5>:<?php echo $row['dri_licensenumber']?></div>
      <div class="driver-address"><h5>Address:</h5><?php echo $row['dri_address']?></div>
      <div class="registration-number"><h5>Registration Number:</h5><?php echo $row['dri_regnumber']?></div>
      <div class="date-of-expiry"><h5>Date of License Expiry:</h5><?php echo $row['dri_licenseExpiry']?></div>
      <div class="date-of-joining"><h5>Date of Joining:</h5><?php echo $row['dri_joiningDate']?></div>
    </div>
  </body>
</html>
