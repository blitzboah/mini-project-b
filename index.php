<?php 
session_start();

if (isset($_SESSION['email'])) {
    $loggedInUserEmail = $_SESSION['email'];
} else {
    header('Location: login.php'); 
    exit();
}
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>BusInfo</title>

    <!-- Bootstrap -->
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

    <!-- CSS stylesheets -->
    <link rel="stylesheet" href="css/styles.css" />

    <!-- Google Fonts -->
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
    <!-- Fontawesome -->
    <script
      src="https://kit.fontawesome.com/6ce188fd6f.js"
      crossorigin="anonymous"
    ></script>
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
          <li class="nav-item">
            <a class="nav-link" href="logout.php">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <section class="colored-section" id="title">
      <div class="container-fluid" style="padding-top: 50px">
        <!-- Nav Bar -->

        <!-- Title -->

        <div class="row">
          <div class="col-lg-6">
            <h1 class="big-heading title-heading">
              For Efficiently Storing Your Data and get Rid of Paperwork
            </h1>
          </div>
          <div class="col-lg-6">
            <div class="im">
              <img
                class="title-image"
                src="images/bus-picture.png"
                alt="iphone-mockup"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->

    <section class="white-section" id="features">
      <div class="container-fluid">
        <div class="row">
          <div class="feature-box col-lg-4">
            <i class="lg fa-solid fa-circle-check fa-4x"></i>
            <h3 class="feature-title">Easy to use</h3>
            <p class="feature-para" style="color: #454545">
              So easy to use that anyone can handle their data safely and
              efficiently.
            </p>
          </div>
          <div class="feature-box col-lg-4">
            <i class="lg fa-solid fa-people-group fa-4x"></i>
            <h3 class="feature-title">Work as a Team</h3>
            <p class="feature-para" style="color: #454545">
              At BusInfo we work as a team try to deliever the best possible
              features.
            </p>
          </div>
          <div class="feature-box col-lg-4">
            <i class="lg fa-solid fa-heart fa-4x"></i>
            <h3 class="feature-title">User Friendly</h3>
            <p class="feature-para" style="color: #454545">
              Our aim is to create a User Friendly website for your comfort, As
              coustomers are our first priority.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->

    <!-- Call to Action -->

    <section class="colored-section" id="cta">
      <div class="container-fluid">
        <h3 class="service-heading">Get the Right Service for your Buisness</h3>
        <br /><br /><br />
        <p class="service" style="font-size: 1.15rem">
          We provide tracking of license expiry date of all the drivers
          registered with your agency aswell we keep track of the permit of the
          vehicles used by your agency.<br />
          As the worl is moving at fast pace and everyone is getting adapted to
          new technologies it is, Your time to use them and get rid of all the
          old methods of storing your data.
        </p>
      </div>
    </section>

    <!-- Footer -->

    <footer id="footer" class="container-fluid white-section">
      <button class="btn btn-lg"><i class="fa-brands fa-twitter"></i></button>
      <button class="btn btn-lg"><i class="fa-brands fa-facebook"></i></button>
      <button class="btn btn-lg"><i class="fa-brands fa-instagram"></i></button>
      <button class="btn btn-lg"><i class="fa-solid fa-envelope "></i></button>
      <p>© Copyright BusInfo</p>
    </footer>
  </body>
</html>
