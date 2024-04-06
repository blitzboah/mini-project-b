import bcrypt from "bcrypt";
import db from "../database/db.js";
import express from "express";

const app = express();
const saltRounds = 10;

const register = async (req, res, next) => {
  const name = req.body.companyName;
  const phno = req.body.phoneNo;
  const address = req.body.address;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const checkResult = await db.query(
      "SELECT * FROM company WHERE company_email = $1 OR company_name =$2",
      [email, name]
    );

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      bcrypt.hash(password, saltRounds, async (err, pass) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", pass);
          const result = await db.query(
            "INSERT INTO company (company_name, company_address, company_email, company_phno, paswd) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, address, email, phno, pass]
          );
          const userRegisteredCheck = result.rows.length;
          if (userRegisteredCheck > 0) {
            console.log(`User is registered successfully.`);
          } else {
            console.log(`User was not able to register`);
          }
        }
      });
      next();
    }
  } catch (err) {
    console.log(err);
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
        } else {
          if (result) {
            console.log(`user successfully logged in`);
            req.session.user = user;
            res.redirect("/api/users/index");
            cb();
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const assignTasks = async (req, res, cb) => {
  const tripDate = req.body.date;
  const tripDuration = req.body.duration;
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
    cb();
  } catch (error) {
    console.log(error);
  }
};

const regiserVehicles = async (req, res, cb) => {
  const vin = req.body.vehicleIdenticficationNumber;
  const permitExpiry = req.body.permitExpiry;
  // const companyId = await getLoggedInUserCompanyId(req);
  const companyId = 1;
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

const sendVehicels = async (req,res,cb) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const result = await db.query("SELECT * FROM vehicles WHERE c_id=$1",[companyId])
    res.render("viewVehicles.ejs",{vehicles: result.rows});
  } catch (error) {
    console.error("Error renderinf viewVehicles:", error)
    res.status(500).send("Internal Server Error! Sorry for in convinience")
  }
}

const sendDrivers = async (req, res) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const result = await db.query("SELECT * FROM drivers WHERE c_id=$1", [
      companyId,
    ]);
    res.render("viewDrivers.ejs", { users: result.rows });
  } catch (error) {
    console.error("Error rendering viewDrivers:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getLoggedInUserCompanyId = async (req) => {
  const loggedInUser = req.session.user;
  if (!loggedInUser) {
    throw new Error("User not authenticated");
  }
  return loggedInUser.c_id;
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("User logged out successfully");
      res.redirect("/api/users/login");
    }
  });
};

export { register, login, assignTasks, sendDrivers, regiserVehicles, sendVehicels, logout };
