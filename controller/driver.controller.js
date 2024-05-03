import bcrypt from "bcrypt";
import db from "../database/db.js";
import express from "express";
import nodemailer from "nodemailer";
import env from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
env.config();

const app = express();
const saltRounds = 10;

app.use(cookieParser());

const generateToken = (user) => {
  const payload = {
    id: user.d_id,
    phoneNo: user.driver_phno,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const register = async (req, res, next) => {
  const cName = req.body.companyName;
  const name = req.body.driverName;
  const phno = req.body.phoneNumber;
  const licno = req.body.licenseNumber;
  const address = req.body.driverAddress;
  const password = req.body.password;
  const licExp = req.body.expiryDate;
  const licensePhoto = req.file;

  res.set("Content-Type", "application/json");

  try {
    if (!licensePhoto) {
      return res.status(400).json({ message: "License photo is required" });
    }

    const checkResult = await db.query(
      "SELECT * FROM drivers WHERE driver_name = $1",
      [name]
    );

    if (checkResult.rows.length > 0) {
      return res.send("Driver already registered.");
    }

    const companyIdQueryResult = await db.query(
      "SELECT * FROM company WHERE LOWER(company_name) LIKE LOWER($1)",
      [`%${cName}%`]
    );

    if (companyIdQueryResult.rows.length === 0) {
      return res.status(500).json({ message: "Error getting company ID" });
    }

    const companyId = companyIdQueryResult.rows[0].c_id;

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
      "INSERT INTO drivers (driver_name, driver_phno, driver_licno, driver_address, driver_licesp, c_id, paswd, driver_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        phno,
        licno,
        address,
        licExp,
        companyId,
        hashedPassword,
        licensePhoto.path,
      ]
    );

    if (result.rows.length > 0) {
      return res
        .status(201)
        .json({ message: `Driver registered successfully` });
    } else {
      return res.status(500).json({ message: "Error registering driver" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "An error occurred while registering the driver" });
  }
};

const login = async (req, res, cb) => {
  const phno = req.body.phoneNo;
  const password = req.body.password;
  console.log(req.body);
  try {
    const isDriverRegistered = await db.query(
      "SELECT * FROM drivers WHERE driver_phno= $1",
      [phno]
    );
    if (isDriverRegistered.rows.length === 0) {
      console.log(`Driver is not registered! please register yourself first`);
      res.status(404).json({ message: "The driver was not found!" });
    } else {
      const user = isDriverRegistered.rows[0];
      const storedPassword = user.paswd;
      bcrypt.compare(password, storedPassword, async (err, result) => {
        if (err) {
          console.log(` ERROR!! in hashing the password `);
          res
            .status(500)
            .json({ message: "Error while comparing the hash passwords!" });
        } else {
          if (result) {
            console.log(`Driver successfully logged in`);
            const token = generateToken(user);
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              secure: true,
            });
            console.log(token);
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

const tripsCompleted = async (req, res, cb) => {
  // const tripEndTime = req.body.tripEndTime;
  const tripEndTime = new Date(req.body.tripEndTime); 
  console.log(tripEndTime);
  try {
    const trip = await db.query(
      "SELECT trip_id, trip_starttime FROM trips WHERE trip_id=$1",
      [req.body.tripId]
    );
    const tripId = trip.rows[0].trip_id;
    const tripStartTime = new Date(trip.rows[0].trip_starttime); // Convert to Date object
    console.log(tripId);
    if (!tripId) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Check if trip end time is after start time
    const tripEndTimeDate = new Date(tripEndTime);
    if (tripEndTimeDate <= tripStartTime) {
      return res
        .status(400)
        .json({ message: "End time must be after start time" });
    }
    console.log(tripEndTimeDate);
    console.log(tripStartTime);
    // Calculate trip duration
    const tripDuration = tripEndTimeDate - tripStartTime; // Difference in milliseconds
    // Check if trip duration is a valid number
    if (isNaN(tripDuration)) {
      console.log("Invalid trip duration");
      return res.status(400).json({ message: "Invalid trip duration" });
    }
    const tripDurationHours = Math.round(tripDuration / (1000 * 60 * 60));
    // Retrieve driver information
    const driverTrip = await db.query(
      "SELECT * FROM assigned_trips WHERE trip_id=$1",
      [tripId]
    );
    const driver = await db.query("SELECT * FROM drivers WHERE d_id=$1",[driverTrip.rows[0].d_id]);
    const driverId = driver.rows[0].d_id;
    const drivingHrs = driver.rows[0].driving_hrs;
    console.log(tripDurationHours);
    if (drivingHrs === null) {
      // If driving hours are null, set them to trip duration
      await db.query("BEGIN");
      const updateResult = await db.query(
        "UPDATE drivers SET driving_hrs=$1 WHERE d_id=$2",
        [tripDurationHours, driverId]
      );
      await db.query("COMMIT");
      if (updateResult.rowCount > 0) {
        console.log(`Driving hours successfully updated`);
      } else {
        console.log(`No rows were updated`);
      }
    } else {
      // If driving hours are not null, add trip duration to existing driving hours
      await db.query("BEGIN");
      const updateResult = await db.query(
        "UPDATE drivers SET driving_hrs=driving_hrs+$1 WHERE d_id=$2",
        [tripDurationHours, driverId]
      );
      await db.query("COMMIT");
      if (updateResult.rowCount > 0) {
        console.log(`Driving hours successfully updated`);
      } else {
        console.log(`No rows were updated`);
      }
    }
    const comp = await db.query("SELECT * FROM drivers WHERE d_id=$1",[driverId]);
    // console.log(comp.rows[0].c_id);
    const companyDetails = await db.query("SELECT * FROM company WHERE c_id=$1",[comp.rows[0].c_id]);
    // console.log(companyDetails);
    const companyEmail = companyDetails.rows[0].company_email;

    // Delete trip from assigned_trips table
    if (
      await db.query("DELETE FROM assigned_trips WHERE trip_id = $1", [tripId])
    ) {
      console.log(`Trip deleted from assigned trips table`);
    }
    // Delete trip from trips table
    if (await db.query("DELETE FROM trips WHERE trip_id = $1", [tripId])) {
      console.log(`Trip deleted from trips table`);

      // Send completion email
      const emailMessage = `
        Trip completed successfully!\n
        Trip ID: ${tripId}\n
        Trip Start Time: ${tripStartTime}\n
        Trip End Time: ${tripEndTime}\n
        Trip Duration (Hours): ${tripDurationHours}\n
        Driver ID: ${driverId}\n
        Driving Hours: ${drivingHrs}\n
      `;

      const emailOptions = {
        from: process.env.EMAIL,
        to: companyEmail,
        subject: "Trip Completed!!",
        text: emailMessage,
      };

      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      return res.status(200).json({ message: "Trip completed successfully" });
    }
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
    console.log(driverId);
    const assignedTrips = await db.query(
      "SELECT trip_id FROM assigned_trips WHERE d_id=$1",
      [driverId]
    );
    console.log(assignedTrips);
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
    // console.log(tripsDetails);
    res.status(200).json({
      success: true,
      message: "Trips sent successfully",
      tripsDetails,
    });
  } catch (error) {
    console.error("Error rendering viewDrivers:", error);
    res.status(500).send("Internal Server Error");
  }
};

const resetDrivingHours = async () => {
  try {
    await db.query("UPDATE drivers SET driving_hrs = 0");
    console.log("Driving hours reset to 0 for all drivers");
  } catch (error) {
    console.error("Error resetting driving hours:", error);
  }
};



const getAllRegisteredCompanies = async (req) => {
  const companies = await db.query("SELECT * FROM company");
  return companies.rows;
};

const sendDriverStatus = async (req, res, next) => {
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

const updateDriversLicExp = async (req, res) => {
  const licExp = req.body.driver_licesp;
  try {
    const driverId = await getLoggedInUserCompanyId(req);
    const updateLicenseExpiry = await db.query(
      "UPDATE drivers SET driver_licesp=$1 WHERE d_id=$2",
      [licExp, driverId]
    );
    res.send(200).json({ message: "Driver's Details Successfully Updated!" });
  } catch (error) {}
};

const getLoggedInUserCompanyId = (req) => {
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
  tripsCompleted,
  sendTrips,
  resetDrivingHours,
  sendDriverStatus,
  updateDriversLicExp,
  logout,
};
