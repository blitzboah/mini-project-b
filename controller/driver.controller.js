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
      "SELECT * FROM drivers WHERE driver_name =$1",
      [name]
    );

    if (checkResult.rows.length > 0) {
      res.send("Driver already registered.");
    } else {
      const companyId = await db.query(
        "SELECT c_id FROM company WHERE LOWER(company_name) LIKE LOWER(%$1%)",
        [cName]
      );
      bcrypt.hash(password, saltRounds, async (err, pass) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", pass);
          const result = await db.query(
            "INSERT INTO drivers (driver_name, driver_phno, driver_licno, driver_address, driver_licesp, c_id, paswd) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, phno, licno, address, licExp, companyId, pass]
          );
          const driverRegisteredCheck = result.rows.length;
          if (driverRegisteredCheck > 0) {
            console.log(`Driver is registered successfully.`);
          } else {
            console.log(`Driver was not able to register`);
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

export { register, login };
