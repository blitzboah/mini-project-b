<?php

include('connection.php');
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

if (isset($_POST['reg_driver'])) {
    $regNumber = isset($_POST['registrationNumber']) ? $_POST['registrationNumber'] : '';
    $name = $_POST['driverName'];
    $add = $_POST['driverAddress'];
    $phone = $_POST['driverPhone'];
    $licNumber = $_POST['licenseNumber'];
    $doe = $_POST['dateOfExpiry'];
    $doj = $_POST['dateOfJoining'];

    $driverPhotoPath = '';
    if (isset($_FILES['driverPhoto']) && $_FILES['driverPhoto']['error'] === UPLOAD_ERR_OK) {
        $driverPhotoName = $_FILES['driverPhoto']['name'];
        $driverPhotoTmpName = $_FILES['driverPhoto']['tmp_name'];
        $photoDirectory = 'uploads/';
        $driverPhotoPath = $photoDirectory . $driverPhotoName;

        if (move_uploaded_file($driverPhotoTmpName, $driverPhotoPath)) {
        } else {
            $errorMessage = 'Failed to upload driver photo.';
        }
    } else {
        $errorMessage = 'Driver photo is required.';
    }

    $licPhotoPath = '';
    if (isset($_FILES['licensePhoto']) && $_FILES['licensePhoto']['error'] === UPLOAD_ERR_OK) {
        $licPhotoName = $_FILES['licensePhoto']['name'];
        $licPhotoTmpName = $_FILES['licensePhoto']['tmp_name'];
        $photoDirectory = 'uploads/';
        $licPhotoPath = $photoDirectory . $licPhotoName;

        if (move_uploaded_file($licPhotoTmpName, $licPhotoPath)) {
        } else {
            $errorMessage = 'Failed to upload license photo.';
        }
    } else {
        $errorMessage = 'License photo is required.';
    }

    $loggedInUserId = $_SESSION['user_id'];

    $licensePattern = '/^[A-Za-z]{2}\d{2}\s\d{11}$/';
    $regNumberPattern='/^[A-Za-z]{2}\s\d{6}$/';

    if (!preg_match($licensePattern, $licNumber) || !preg_match($regNumberPattern, $regNumber)) {
        $errorMessage = 'License number should be in the format: XX00 00000000000 and Registration Number should be in the format CM 000000 where CM are company initials';
    } elseif (strlen($phone) !== 10) {
        $errorMessage = 'Your phone number must be exactly 10 digits.';
    } else {
        $query = "SELECT * FROM `driverinfo` WHERE `dri_licensenumber` = '$licNumber' OR `dri_regnumber` = '$regNumber' LIMIT 1";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) {
            $errorMessage = 'Driver with the same license number or registration number already exists';
        } else {
            $insertQuery = "INSERT INTO `driverinfo`(`dri_regnumber`, `dri_name`, `dri_address`, `dri_phonenumber`, `dri_photo`, `dri_licensenumber`, `dri_licensephoto`, `dri_joiningDate`, `dri_licenseExpiry`, `driver_owner`) VALUES ('$regNumber', '$name', '$add', '$phone', '$driverPhotoPath', '$licNumber', '$licPhotoPath', '$doj', '$doe', $loggedInUserId)";

            if (mysqli_query($conn, $insertQuery)) {
            } else {
                $errorMessage = 'Error: ' . mysqli_error($conn);
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
  <head>
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
      href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Cabin:wght@600;700&family=Dosis:wght@200;300;400;500;600;700;800&family=Handlee&family=Lobster&family=Playpen+Sans:wght@500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        background-color: #454545;
        font-family: "Montserrat";
      }
    </style>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        var errorMessage = "<?php echo $errorMessage; ?>";
        if (errorMessage !== "") {
          alert(errorMessage);
        }
      });
    </script>
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
              <input type="text" name="registrationNumber" required size="70" />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Driver Name:</label>
            </div>
            <div class="input-field">
              <input type="text" name="driverName" required size="70" />
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
                required
                size="70"
              />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Driver Phone Number:</label>
            </div>
            <div class="input-field">
              <input type="text" name="driverPhone" required size="70" />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">Driver Photo:</label>
            </div>
            <div>
              <input
                type="file"
                id="driverPhoto"
                name="driverPhoto"
                accept=".jpg .jpeg .png"
                required
              />
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
                size="70"
              />
            </div>
            <div class="input-group">
              <label style="margin-right: 10px">License Photo:</label>
            </div>
            <div>
              <input
                type="file"
                id="licensePhoto"
                name="licensePhoto"
                accept=".jpg .jpeg .png"
                required
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
                min="<?php echo date('Y-m-d'); ?>"
                required
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
                required
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
    </div>
  </body>
</html>
