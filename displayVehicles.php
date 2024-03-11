
<?php
require 'vendor/autoload.php';
include('connection.php');
session_start();

if (isset($_SESSION['email'])) {
    $loggedInUserEmail = $_SESSION['email'];
    $queryUserId = "SELECT user_id FROM user WHERE user_email = '$loggedInUserEmail'";
    $resultUserId = mysqli_query($conn, $queryUserId);

    if ($rowUserId = mysqli_fetch_assoc($resultUserId)) {
        $loggedInUserId = $rowUserId['user_id'];
        $query = "SELECT * FROM businfo WHERE bus_owner = $loggedInUserId";
        $result = mysqli_query($conn, $query);

        $sixMonthsFromNow = date('Y-m-d', strtotime('+6 months'));
        while ($row = mysqli_fetch_assoc($result)) {
            if (strtotime($row['bus_permit']) <= strtotime($sixMonthsFromNow)) {
                if ($row['email_sent'] == 0) {
                    $mail = new PHPMailer\PHPMailer\PHPMailer();
                    
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = 'neel32314@gmail.com'; 
                    $mail->Password = 'icrp epeo ajht nctk';
                    $mail->SMTPSecure = 'tls';
                    $mail->Port = 587;
        
                    $mail->setFrom('neelmulik12@gmail.com', 'Neel Mulik');
                    $mail->addAddress($loggedInUserEmail, 'Logged-In User');
                    $mail->Subject = 'Driver License Expiry Notification';
                    $emailBody = "";
        
                    $emailBody .= "Bus Number : " . $row['bus_number'] . "\n";
                    $emailBody .= "Permit is about to expire: " . $row['bus_permit'] . "\n\n";
        
                    $mail->Body = "Hello, the following drivers have licenses about to expire:\n\n" . $emailBody;
        
                    if ($mail->send()) {
                        $driverId = $row['bus_id'];  // Assuming 'bus_id' is the primary key
                        $updateQuery = "UPDATE businfo SET email_sent = 1 WHERE bus_id = $driverId";
                        mysqli_query($conn, $updateQuery);
                        
                    } else {
                        echo 'Email could not be sent. Mailer Error: ' . $mail->ErrorInfo;
                    }
                }
            }
        }
    }
} else {
    header('Location: login.php');
    exit();
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
    <style>
        body{
            background-color: #454545;
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
<div class="container">
    <div class="row mt-5">
        <div class="col">
            <div class="card mt-5">
                <div class="card-header" style="background-color: #d6d46d">
                    <h2 class="display-6 text-center">Registered Vehicles</h2>
                </div>
                <div class="card-body">
                <table class="table table-bordered text-center">
                    <tr class="bg-dark text-white"></tr>
                        <th>Driver Id</th>
                        <th>Vehicle Registration Number</th>
                        <th>Permit Expiry Date</th>
                        <th>Edit</th>        
                        <th>Delete</th>
                    </tr>
                    <tr>
                        <?php
                            $result=mysqli_query($conn,$query);
                            while($row = mysqli_fetch_assoc($result))
                            {
                        ?>
                        <td><?php echo $row['bus_id']?></td>
                        <td><?php echo $row['bus_number']?></td>
                        <td><?php echo $row['bus_permit']?></td>
                        <td><a href="busEdit.php?bedid=<?php echo $row['bus_id'];?>">Edit</a></td>
                        <td><a href="busDelete.php?bdelid=<?php echo $row['bus_id'];?>">Delete</a></td>
                        </tr>
                        <?php
                            }
                        ?>

                </table>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>