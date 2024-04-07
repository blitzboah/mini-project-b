import bcrypt from "bcrypt";
import db from "../database/db.js";
import express from "express";
import nodemailer from "nodemailer";

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
        res.status(200).send(`Driver was registered Successfully`);
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
            res.redirect("/api/drivers/index");
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
    const trip = await db.query(
      "SELECT trip_id, trip_time FROM trips WHERE trip_id=$1",
      [req.body.tripId]
    );
    const tripId = trip.rows[0].trip_id;
    const tripDuration = trip.rows[0].trip_time;
    console.log(tripId);
    if (!tripId) {
      return res.status(404).json({ message: "Trip not found" });
    }
    const driver = await db.query(
      "SELECT * FROM assigned_trips WHERE trip_id=$1",
      [tripId]
    );
    const driverId = driver.rows[0].d_id;
    const drivingHrs = driver.rows[0].driving_hrs;
    console.log(tripDuration);
    if (drivingHrs === null) {
      await db.query("BEGIN");
      const updateResult = await db.query(
        "UPDATE drivers SET driving_hrs=$1 WHERE d_id=$2",
        [tripDuration, driverId]
      );
      await db.query("COMMIT");
      if (updateResult.rowCount > 0) {
        console.log(`Driving hours successfully updated`);
      } else {
        console.log(`No rows were updated`);
      }
    } else {
      await db.query("BEGIN");
      const updateResult = await db.query(
        "UPDATE drivers SET driving_hrs=driving_hrs+$1 WHERE d_id=$2",
        [tripDuration, driverId]
      );
      await db.query("COMMIT");
      if (updateResult.rowCount > 0) {
        console.log(`Driving hours successfully updated`);
      } else {
        console.log(`No rows were updated`);
      }
    }
    if (
      await db.query("DELETE FROM assigned_trips WHERE trip_id = $1", [tripId])
    ) {
      console.log(`Trip deleted from assigned trips table`);
    }
    if (await db.query("DELETE FROM trips WHERE trip_id = $1", [tripId])) {
      console.log(`Trip deleted from trips table`);
    }
    return res.status(200).json({ message: "Trip completed successfully" });
  } catch (error) {
    console.error("Error completing trip:", error);
    res
      .status(500)
      .json({ message: "An error occurred while completing the trip" });
  }
};

const sendTrips = async (req, res) => {
  try {
    const driverId = await getLoggedInUserCompanyId(req);
    const assignedTrips = await db.query(
      "SELECT trip_id FROM assigned_trips WHERE d_id=$1",
      [driverId]
    );
    const tripsDetails = [];
    for (const tripRow of assignedTrips.rows) {
      const tripId = tripRow.trip_id;
      const tripDetails = await db.query(
        "SELECT * FROM trips WHERE trip_id=$1",
        [tripId]
      );
      if (tripDetails.rows.length > 0) {
        tripsDetails.push(tripDetails.rows[0]);
      }
    }
    res.render("viewTrips.ejs", { trips: tripsDetails });
  } catch (error) {
    console.error("Error rendering viewDrivers:", error);
    res.status(500).send("Internal Server Error");
  }
};

const resetDrivingHours = async () => {
  try {
    // const currentTime = new Date();
    // const day = currentTime.getDay();
    // const hour = currentTime.getHours();
    // const minutes = currentTime.getMinutes();
    // if (day === 1 && hour === 0 && minutes === 0) {
    await db.query("UPDATE drivers SET driving_hrs = 0");
    console.log("Driving hours reset to 0 for all drivers");
    // }
  } catch (error) {
    console.error("Error resetting driving hours:", error);
  }
};

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'bud.franecki@ethereal.email',
      pass: '9Z2PkCEBPMcTaJeqSe'
  }
});

const getAllRegisteredCompanies = async (req) => {
  const companies = await db.query("SELECT * FROM company");
  return companies.rows;
};

const sendDriverStatus = async (req , res, next) => {
  try {
    const currentDate = new Date();
    const expiryDate30Days = new Date();
    const expiryDate15Days = new Date();
    expiryDate30Days.setDate(currentDate.getDate() + 30);
    expiryDate15Days.setDate(currentDate.getDate() + 15);
    
    const companyEmails = await getAllRegisteredCompanies(req);
    console.log(companyEmails);

    for (const companyEmail of companyEmails) {
      const drivers30Days = await db.query(
        "SELECT * FROM drivers WHERE driver_licesp < $1 AND c_id = $2",
        [expiryDate30Days, companyEmail.c_id]
      );

      const drivers15Days = await db.query(
        "SELECT * FROM drivers WHERE driver_licesp < $1 AND c_id = $2",
        [expiryDate15Days, companyEmail.c_id]
      );

      let emailText = `Dear ${companyEmail.company_name},\n\nThe following drivers' licenses are about to expire:\n\n`;

      if (drivers30Days.rows.length > 0) {
        emailText += `Expiring in 30 days:\n`;
        drivers30Days.rows.forEach((driver) => {
          emailText += `- ${driver.driver_name} (${driver.driver_licno})\n`;
        });
      }

      if (drivers15Days.rows.length > 0) {
        emailText += `\nExpiring in 15 days:\n`;
        drivers15Days.rows.forEach((driver) => {
          emailText += `- ${driver.driver_name} (${driver.driver_licno})\n`;
        });
      }

      const emailOptions = {
        from: process.env.EMAIL,
        to: companyEmail.company_email,
        subject: "Reminder About Driver's License expiry",
        text: emailText,
      };

      await transporter.sendMail(emailOptions);
      console.log(`Email sent to ${companyEmail.company_name} successfully`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const getLoggedInUserCompanyId = async (req) => {
  const loggedInUser = req.session.user;
  if (!loggedInUser) {
    throw new Error("User not authenticated");
  }
  return loggedInUser.d_id;
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("User logged out successfully");
      res.redirect("/api/drivers/login");
    }
  });
};

export {
  register,
  login,
  tripsCompleted,
  sendTrips,
  resetDrivingHours,
  sendDriverStatus,
  logout,
};
