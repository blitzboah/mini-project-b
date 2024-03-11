<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

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
    <link rel="stylesheet" href="css/register.css" />

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
    <style>
      body {
        background-color: #454545;
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
    <section class="register-section">
      <div class="container container-fluid register-container">
        <div class="reg-driver">
          <h3>Register Your Drivers</h3>
          <p>
            Register the drivers related to your company. We keep track of their
            license validity period. And notify you when the license is about to
            expire, so you can ask your drivers to renew their license for
            smooth functioning.
          </p>
          <div>
            <button id="driverReg">Register</button>
          </div>
        </div>
        <div class="reg-bus">
          <h3>Register Your vehicles</h3>
          <p>
            Register the vehicles owned by your company. We keep the track of
            the permit renewal of the vehicles, <br />for smooth functionallity
            of your buisness without facing any legal issues.
          </p>
          <div>
            <button id="busReg">Register</button>
          </div>
        </div>
      </div>
    </section>
  </body>
  <script type="text/javascript">
    document.getElementById("driverReg").onclick = function () {
      location.href = "./driverReg.php";
    };
  </script>
  <script type="text/javascript">
    document.getElementById("busReg").onclick = function () {
      location.href = "./busReg.php";
    };
  </script>
</html>
