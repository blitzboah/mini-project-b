import bcrypt from "bcrypt";
import db from "../database/db.js";
import express from "express";

const app = express();
const saltRounds = 10;

const register = async (req, res, next) => {
  const cName = req.body.companyName;
  const name = req.body.driverName;
  const phno = req.body.phoneNo;
  const licno = req.body.licenseNo;
  const address = req.body.driverAddress;
  const password = req.body.password;
  const licExp = req.body.expiryDate;

  try {
    const checkResult = await db.query(
      "SELECT * FROM drivers WHERE driver_name = $1",
      [name]
    );

    if (checkResult.rows.length > 0) {
      res.send("Driver already registered.");
    } else {
      const companyIdQueryResult = await db.query(
        "SELECT * FROM company WHERE LOWER(company_name) LIKE LOWER($1)",
        [`%${cName}%`]
      );
      const companyId = companyIdQueryResult.rows[0].c_id;
      console.log(companyId);

      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, pass) => {
          if (err) {
            console.error("Error hashing password:", err);
            reject(err);
          } else {
            console.log("Hashed Password:", pass);
            resolve(pass);
          }
        });
      });

      const result = await db.query(
        "INSERT INTO drivers (driver_name, driver_phno, driver_licno, driver_address, driver_licesp, c_id, paswd) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, phno, licno, address, licExp, companyId, hashedPassword]
      );

      const driverRegisteredCheck = result.rows.length;
      if (driverRegisteredCheck > 0) {
        console.log(`Driver is registered successfully.`);
      } else {
        console.log(`Driver was not able to register`);
      }
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, cb) => {
  const phno = req.body.phoneNo;
  const password = req.body.password;
  try {
    const isDriverRegistered = await db.query(
      "SELECT * FROM drivers WHERE driver_phno= $1",
      [phno]
    );
    if (isDriverRegistered.rows.length === 0) {
      console.log(`Driver is not registered! please register yourself first`);
    } else {
      const user = isDriverRegistered.rows[0];
      const storedPassword = user.paswd;
      bcrypt.compare(password, storedPassword, async (err, result) => {
        if (err) {
          console.log(` ERROR!! in hashing the password `);
        } else {
          if (result) {
            console.log(`Driver successfully logged in`);
            req.session.user = user;
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

const tripsCompleted = async (req, res, cb) => {
  try {
    const tripId = await db.query(
      "SELECT trip_id FROM trips WHERE trip_id=$1",
      [req.body.tripId]
    );
    if (tripId.length === 0) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const driverId = await db.query(
      "SELECT d_id FROM assigned_trips WHERE trip_id=$1",
      [tripId[0].trip_id]
    );
    const tripDuration = await db.query(
      "SELECT trip_time FROM trips WHERE trip_id=$1",
      [tripId[0].trip_id]
    );
    db.query(
      "UPDATE drivers SET driving_hours=driving_hours+$1 WHERE d_id=$2",
      [tripDuration[0].trip_time, driverId[0].d_id]
    );
    db.query("DELETE FROM assigned_trips WHERE trip_id = $1", [
      tripId[0].trip_id,
    ]);
    db.query("DELETE FROM trips WHERE trip_id = $1", [tripId[0].trip_id]);
    return res.status(200).json({ message: "Trip completed successfully" });
  } catch (error) {
    console.error("Error completing trip:", error);
    res
      .status(500)
      .json({ message: "An error occurred while completing the trip" });
  }
};

export { register, login, tripsCompleted };
