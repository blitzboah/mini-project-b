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
    <link rel="stylesheet" href="css/login-g.css" />
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
      href="https://fonts.googleapis.com/css2?family=Inknut Antiqua:wght@400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inria Sans:wght@400&display=swap"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inika:wght@400&display=swap"
    />
  </head>
  <body>
    <div class="loging">
      <div class="loging-child"></div>
      <div class="loging-item"></div>
      <div class="login-to-businfo">Login To BusInfo</div>
      <div class="component-1">
        <div class="component-1-child"></div>
        <img class="user-solid-1-icon" alt="" src="./public/usersolid-1.svg" />
        <form  method="post">
        <input
          class="username"
          name="email"
          placeholder="E-mail"
          type="email"
        />
    
      </div>
      <div class="component-2">
        <div class="component-1-child"></div>
        
        <input
          class="password"
          name="password"
          placeholder="Password"
          type="password"
        />
       

        <img class="lock-solid-1-icon" alt="" src="./public/locksolid-1.svg" />
      </div>
      <div class="dont-have-an">Don’t have an account?</div>
      <a class="sign-up-now" href="signup.php" id="signUpNow"
        >Sign Up now</a
      >
      <button class="loging-inner" id="rectangleButton" type="submit" name="login"><div class="login2"></div>Login</button>

      </form>
      <div class="loging-child1"></div>
      <div class="loging-child2"></div>
      <div class="loging-child3"></div>
      <div class="loging-child4"></div>
      <div class="loging-child5"></div>
      <div class="loging-child6"></div>
      <div class="loging-child7"></div>
      <div class="loging-child8"></div>
      <div class="loging-child9"></div>
      <div class="loging-child10"></div>
      <div class="loging-child11"></div>
      <div class="loging-child12"></div>
      <img class="loging-child13" alt="" src="./public/polygon-6.svg" />

      <img class="loging-child14" alt="" src="./public/polygon-6.svg" />

      <img class="loging-child15" alt="" src="./public/polygon-8.svg" />

      <img class="loging-child16" alt="" src="./public/polygon-9.svg" />

      <img class="user-solid-2-icon" alt="" src="./public/usersolid-2.svg" />

      <img class="file-solid-2-icon" alt="" src="./public/filesolid-2.svg" />
    </div>

  </body>
</html>

