import bcrypt from "bcrypt";
import db from "../database/db.js";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const saltRounds = 10;

const generateToken = (user) => {
  const payload = {
    id: user.c_id,
    email: user.company_email,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
};

const register = async (req, res, next) => {
  const name = req.body.companyName;
  const phno = req.body.phoneNo;
  const address = req.body.address;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  try {
    const checkResult = await db.query(
      "SELECT * FROM company WHERE company_email = $1 OR company_name =$2",
      [email, name]
    );

    if (checkResult.rows.length > 0) {
      res
        .status(409)
        .json({ message: "Email already exists. Try logging in." });
    } else {
      bcrypt.hash(password, saltRounds, async (err, pass) => {
        if (err) {
          console.error("Error hashing password:", err);
          res
            .status(500)
            .json({ message: "An error occurred while hashing the password" });
        } else {
          console.log("Hashed Password:", pass);
          const result = await db.query(
            "INSERT INTO company (company_name, company_address, company_email, company_phno, paswd) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, address, email, phno, pass]
          );
          const userRegisteredCheck = result.rows.length;
          if (userRegisteredCheck > 0) {
            console.log(`User is registered successfully.`);
            res.status(201).json({
              success: true,
              message: `User was registered Successfully`,
            });
          } else {
            console.log(`User was not able to register`);
            res.status(500).json({ message: "Error registering user" });
          }
        }
      });
    }
  } catch (err) {
    console.error("Error in register route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res, cb) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const isUserRegistered = await db.query(
      "SELECT * FROM company WHERE company_email= $1",
      [email]
    );
    if (isUserRegistered.rows.length === 0) {
      console.log(`User is not registered! please register yourself first`);
    } else {
      const user = isUserRegistered.rows[0];
      const storedPassword = user.paswd;
      bcrypt.compare(password, storedPassword, async (err, result) => {
        if (err) {
          console.log(` ERROR!! in hashing the password `);
          res
            .status(500)
            .json({ message: "Error while comparing the hash passwords!" });
        } else {
          if (result) {
            console.log(`User successfully logged in`);
            const token = generateToken(user);
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 3600000,
            });
            res.status(200).json({
              success: true,
              message: `User was logged in Successfully`,
              user,
              token,
            });
          } else {
            res.status(401).json({ message: "Incorrect Password" });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Side Error!!" });
  }
};

const assignTasks = async (req, res, cb) => {
  let tasksAssigned = false; // Flag to track if tasks were successfully assigned

  try {
    console.log("Starting assignTasks function");

    const tripDate = req.body.date;
    const arrivingCity = req.body.arrivingCity;
    const destinationCity = req.body.destinationCity;
    const startTime = req.body.startTime;

    // Check if all required fields are provided
    if (!tripDate || !arrivingCity || !destinationCity || !startTime) {
      return res.status(400).json({ message: "Incomplete information." });
    }

    // Get the company ID of the logged-in user
    const companyId = await getLoggedInUserCompanyId(req);

    console.log("After getting company ID");

    // Insert trip details into the database
    const tripDetails = await db.query(
      "INSERT INTO trips (trip_date, trip_arrivalcity, trip_destinationcity, trip_starttime, c_id) VALUES ($1, $2, $3, $4, $5) RETURNING trip_id",
      [tripDate, arrivingCity, destinationCity, startTime, companyId]
    );
    const trip_id = tripDetails.rows[0].trip_id;

    console.log("After inserting trip details into the database");

    let assignedTrip = null;
    let driver = null;

    // Loop until a driver is assigned or a maximum number of attempts is reached
    const maxAttempts = 100; // Define a maximum number of attempts to prevent infinite loop
    let attemptCount = 0;

    while (!assignedTrip && attemptCount < maxAttempts) {
      attemptCount++;

      // Fetch the trip details
      const trips = await db.query("SELECT * FROM trips WHERE trip_id = $1", [
        trip_id,
      ]);
      const tripDetails = trips.rows[0];

      // Fetch all drivers
      const driverDetails = await db.query("SELECT * FROM drivers");
      const drivers = driverDetails.rows;

      // Randomly select a driver
      const driverNumber = Math.floor(Math.random() * drivers.length);
      driver = drivers[driverNumber];

      // Check if the selected driver belongs to the same company and their driving hours are less than 48
      if (driver.c_id === companyId && driver.driving_hrs < 48) {
        // Assign the trip to the selected driver
        assignedTrip = await db.query(
          "INSERT INTO assigned_trips (d_id, trip_id) VALUES ($1, $2)",
          [driver.d_id, trip_id]
        );
      }
    }

    console.log("After attempting to assign a driver");

    if (assignedTrip) {
      // Update flag to indicate tasks were successfully assigned
      tasksAssigned = true;
      console.log("Tasks assigned successfully.");
    } else {
      console.log("Failed to assign tasks. Please try again later.");
    }
  } catch (error) {
    // Log the error
    console.error("Error assigning tasks:", error);
  } finally {
    // Send response based on whether tasks were successfully assigned
    if (tasksAssigned) {
      return res.status(200).json({ message: "Tasks assigned successfully." });
    } else {
      return res
        .status(500)
        .json({ message: "An error occurred while assigning tasks." });
    }
  }
};

const regiserVehicles = async (req, res, cb) => {
  const vin = req.body.busNumber;
  const permitExpiry = req.body.permitExpiry;
  console.log(req.body);
  const companyId = await getLoggedInUserCompanyId(req);
  try {
    const result = await db.query(
      "INSERT INTO vehicles (v_vin,v_perexp,c_id) VALUES ($1,$2,$3)",
      [vin, permitExpiry, companyId]
    );
    if (result.rowCount > 0) {
      res.status(200).send("Vehicle was successfully Registered!!");
    } else {
      res.status(404).send("There was some error in registering the vehicle");
    }
  } catch (error) {
    if (error) {
      res.status(500).send("There was some issue on the Server Side");
    }
  }
};

const sendVehicels = async (req, res, cb) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const result = await db.query("SELECT * FROM vehicles WHERE c_id=$1", [
      companyId,
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error renderinf viewVehicles:", error);
    res
      .status(500)
      .json({ messsage: "Internal Server Error! Sorry for in convinience" });
  }
};

const sendDrivers = async (req, res) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const result = await db.query("SELECT * FROM drivers WHERE c_id=$1", [
      companyId,
    ]);
    const drivers = result.rows;
    res.status(200).json({
      success: true,
      message: "Drivers List Successfully sent",
      drivers,
    });
  } catch (error) {
    console.error("Error rendering viewDrivers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getLoggedInUserCompanyId = async (req) => {
  const token = req.cookies.token;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.id;
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully logged out" });
};

export {
  register,
  login,
  assignTasks,
  sendDrivers,
  regiserVehicles,
  sendVehicels,
  logout,
};
