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

  res.set("Content-Type", "application/json");

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
            res
              .status(201)
              .json({ message: `User was registered Successfully` });
          } else {
            console.log(`User was not able to register`);
            res.status(500).json({ message: "Error registering user" });
          }
        }
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user" });
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
            res
              .status(200)
              .json({ message: `User was logged in Successfully` });
          } else {
            res.status(401).json({ message: "Incorrect Password" });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.send(500).json({ message: "Server Side Error!!" });
  }
};

const assignTasks = async (req, res, cb) => {
  const tripDate = req.body.date;
  const tripDuration = req.body.duration;
  if (!date ||!duration) {
    return res.status(400).json({ message: "Date and duration are required." });
  }
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const tripDetails = await db.query(
      "INSERT INTO trips (trip_date,trip_time,c_id) VALUES ($1,$2,$3) RETURNING *",
      [tripDate, tripDuration, companyId]
    );
    const trip_id = tripDetails.rows[0].trip_id;
    let assignedTrip;
    let driverNumber;
    let driver;
    do {
      const trips = await db.query("SELECT * FROM trips WHERE trip_id=$1", [
        trip_id,
      ]);
      const tripDetails = trips.rows[0];
      const driverDetails = await db.query("SELECT * FROM drivers");
      const drivers = driverDetails.rows;
      driverNumber = Math.floor(Math.random() * drivers.length);
      driver = drivers[driverNumber];
      const driverNo = driver.c_id;
      const driverDrivingHrs = driver.driving_hrs;
      if (driverNo !== companyId || driverDrivingHrs >= 48) {
        continue;
      }
      assignedTrip = await db.query(
        "INSERT INTO assigned_trips VALUES ($1,$2)",
        [driver.d_id, tripDetails.trip_id]
      );
    } while (!assignedTrip);
    res.status(200).json({ message: "Tasks assigned successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while assigning tasks." });
  }
};

const regiserVehicles = async (req, res, cb) => {
  const vin = req.body.vehicleIdenticficationNumber;
  const permitExpiry = req.body.permitExpiry;
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
    res.send(200).json(result);
  } catch (error) {
    console.error("Error renderinf viewVehicles:", error);
    res.status(500).send("Internal Server Error! Sorry for in convinience");
  }
};

const sendDrivers = async (req, res) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const result = await db.query("SELECT * FROM drivers WHERE c_id=$1", [
      companyId,
    ]);
    res.send(200).json(result)
  } catch (error) {
    console.error("Error rendering viewDrivers:", error);
    res.status(500).send("Internal Server Error");
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
