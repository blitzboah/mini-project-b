<?php
    require 'connection.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <title>BusInfo</title>
    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/sign-up-g.css" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Nunito Sans:wght@700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Open Sans Hebrew:wght@300;400;700;800&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inria Sans:wght@400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inika:wght@400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inknut Antiqua:wght@400&display=swap"
    />
  </head>
  <body>
    <div class="signupg">
    <form action="signup.php" method="post">
      <div class="signupg-child"></div>
      <div class="signupg-item"></div>
      <div class="signupg-inner"></div>
      <div class="component-3">
        <div class="component-3-child"></div>

        <input class="name" type="text" name="email" placeholder="Email" required>
      </div>
      <div class="component-4">
        <div class="component-3-child"></div>
        <input class="set-username" type="text" name="username" placeholder="Name" required>
      </div>
      <div class="component-5">
        <div class="component-3-child"></div>
        <input class="e-mail" type="text" name="companyname" placeholder="Company Name" required>
      </div>
      <div class="component-6">
        <div class="component-3-child"></div>
        <input class="password" type="password" name="password" placeholder="Password" required>
      </div>
      <button class="component-8" type="submit" name="signup">
        <div class="component-8-child"></div>
        <div class="sign-up">Sign Up</div>
      </button>
</form>
      <img class="bus-solid-2-icon" alt="" src="./public/bussolid-2.svg" />

      <img class="file-solid-3-icon" alt="" src="./public/filesolid-3.svg" />

      <img class="user-solid-3-icon" alt="" src="./public/usersolid-3.svg" />

      <img
        class="database-solid-1-icon"
        alt=""
        src="./public/databasesolid-1.svg"
      />

      <div class="signupg-child1"></div>
      <div class="signupg-child2"></div>
      <div class="signupg-child3"></div>
      <div class="signupg-child4"></div>
      <div class="signupg-child5"></div>
      <div class="signupg-child6"></div>
      <div class="signupg-child7"></div>
      <img class="signupg-child8" alt="" src="./public/polygon-10.svg" />

      <img class="signupg-child9" alt="" src="./public/polygon-11.svg" />

      <img class="signupg-child10" alt="" src="./public/polygon-12.svg" />

      <div class="already-have-an">Already have an account?</div>
      <a class="login2" href="./login.php">Login</a>
    </div>
  </body>
</html>
