<?php
require 'vendor/autoload.php';
include('connection.php');
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$loggedInUserId = $_SESSION['user_id'];
$errorMessage = '';

if (isset($_POST['reg_bus'])) {
    $busNumber = $_POST['busNumber'];
    $permitExpiry = $_POST['permitExpiry'];

    $busNumberPattern = '/^[A-Z]{2}\s\d{2}\s[A-Z]{2}\s\d{4}$/';

    if (!preg_match($busNumberPattern, $busNumber)) {
        $errorMessage = 'Bus number should be in the format: XX 00 XX 0000';
    } else {
        $query = "SELECT * FROM `businfo` WHERE `bus_number` = '$busNumber' AND `bus_owner` = '$loggedInUserId' LIMIT 1";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $errorMessage = 'Bus with the same number already exists';
        } else {
            $insertQuery = "INSERT INTO `businfo` (`bus_owner`, `bus_number`, `bus_permit`) VALUES ('$loggedInUserId', '$busNumber', '$permitExpiry')";

            if (mysqli_query($conn, $insertQuery)) {
            } else {
                $errorMessage = 'Error: ' . mysqli_error($conn);
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BusInfo</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
      crossorigin="anonymous"
    ></script>
    <link rel="stylesheet" type="text/css" href="css/driverReg.css" />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;900&family=Ubuntu&display=swap"
      rel="stylesheet"
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Handlee&display=swap"
      rel="stylesheet"
    />    
    <link
      href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Cabin:wght@600;700&family=Dosis:wght@200;300;400;500;600;700;800&family=Handlee&family=Lobster&family=Playpen+Sans:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
        body{
            background-color: #454545;
            font-family:"Montserrat";
        }
        ul {
            font-size: 1.15rem;
            font-family: "Montserrat";
        }
        li {
            padding: 0 30px;
        }
        .navbar-brand {
            font-size: 2rem;
            font-family: "ADLaM Display", cursive;
        }

    </style>
</head>
<body>
<nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      style="padding: 50px"
    >
      <a class="navbar-brand" href="#" style="padding-left: 50px">BusInfo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse n justify-content-end"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active">
            <a class="nav-link" href="index.php">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="register.php">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="view.php">View</a>
          </li>
        </ul>
      </div>
    </nav>
 
<div class="container" style="margin: 50px">
      <div class="login-form">
        <form method="post">
          <div>
            <div class="form-header">
              <h2>Register Your Vehicle:</h2>
            </div>
            <br />
            <div class="input-group">
              <label style="margin-right: 10px">Vehicle Registration Number:</label>
            </div>
            <div class="input-field">
              <input type="text" name="busNumber" required size="70" />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px"
                >Date of Expiry of Permit:</label
              >
            </div>
            <div>
              <input
                type="date"
                name="permitExpiry"
                min="<?php echo date('Y-m-d'); ?>"
                required
              />
      </div>
            <br />
            <div class="input-group">
              <button type="submit" name="reg_bus">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
  </div>
</body>
</html>