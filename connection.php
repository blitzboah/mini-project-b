<?php
$conn = mysqli_connect("localhost","root","","miniproject");
$errorMessage = "";

if (isset($_POST["login"])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashedPassword = md5($password);

    $conn = mysqli_connect('localhost', 'root', '', 'miniproject');

    if (!$conn) {
        die('Database connection failed: ' . mysqli_connect_error());
    }

    $query = "SELECT * FROM user WHERE user_email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        if ($hashedPassword == $row['user_password']) {
            session_start();
            $_SESSION['email'] = $email;
            $_SESSION['user_id'] = $row['user_id']; 
            header('Location: index.php');
            
        } else {
            echo 'Incorrect password.';
        }
    } else {
        echo 'User not found.';
    }

    mysqli_close($conn);
}

if (isset($_POST['signup'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $email = $_POST['email'];
        $username = $_POST['username'];
        $companyname = $_POST['companyname'];
        $password = $_POST['password'];
        $hashedPassword = md5($password);
    
        $conn = mysqli_connect('localhost', 'root', '', 'miniproject');
    
        if (!$conn) {
            die('Database connection failed: ' . mysqli_connect_error());
        }
    
        $query = "INSERT INTO user (user_email, user_username, user_companyname, user_password) VALUES ('$email', '$username', '$companyname', '$hashedPassword')";
    
        if (mysqli_query($conn, $query)) {
            header('Location: login.php');
        } else {
            echo 'Error: ' . mysqli_error($conn);
        }
    
        mysqli_close($conn);
    }
}
   
?>
 