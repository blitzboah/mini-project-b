import bcrypt from "bcrypt";
import express from "express";
import nodemailer from "nodemailer";
import env from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { uploadFileToS3 } from '../utils/s3.js';
import Company from "../models/Company.js";
import Driver from "../models/Driver.js";
import Trip from "../models/Trip.js";

env.config();

const app = express();
const saltRounds = 10;

app.use(cookieParser());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const register = async (req, res, next) => {
  res.set("Content-Type", "application/json");
  const licensePhoto = req.file;

  const {
    cName,
    name,
    phno,
    licno,
    address,
    password,
    licExp,
  } = req.body;

  try {
    if (!licensePhoto) {
      return res.status(400).json({ message: "License photo is required" });
    }

    const s3Url = await uploadFileToS3(licensePhoto);

    const existingDriver = await Driver.findOne({ driver_name: name });

    if (existingDriver) {
      return res.send("Driver already registered.");
    }

    const company = await Company.findOne({
      company_name: { $regex: new RegExp(cName, 'i') }
    });

    if (!company) {
      return res.status(500).json({ message: "Error getting company ID" });
    }

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, pass) => {
        if (err) {
          console.error("Error hashing password:", err);
          reject(err);
        } else {
          resolve(pass);
        }
      });
    });

    const newDriver = new Driver({
      driver_name: name,
      driver_phno: phno,
      driver_licno: licno,
      driver_address: address,
      driver_licesp: licExp,
      c_id: company._id,
      paswd: hashedPassword,
      driver_photo: s3Url,
      driving_hrs: 0
    });

    await newDriver.save();

    return res.status(201).json({ message: `Driver registered successfully` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while registering the driver" });
  }
};

const login = async (req, res, cb) => {
  const phno = req.body.phoneNo;
  const password = req.body.password;
  console.log(req.body);
  try {
    const driver = await Driver.findOne({ driver_phno: phno });

    if (!driver) {
      console.log(`Driver is not registered! please register yourself first`);
      res.status(404).json({ message: "The driver was not found!" });
    } else {
      const storedPassword = driver.paswd;
      bcrypt.compare(password, storedPassword, async (err, result) => {
        if (err) {
          console.log(` ERROR!! in hashing the password `);
          res.status(500).json({ message: "Error while comparing the hash passwords!" });
        } else {
          if (result) {
            console.log(`Driver successfully logged in`);
            const token = generateToken(driver);
            res.cookie("token", token, {
              httpOnly: true,
              maxAge: 1000 * 60 * 60 * 24 * 7,
              secure: true,
            });
            console.log(token);
            res.status(200).json({
              success: true,
              message: `User was logged in Successfully`,
              user: driver,
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

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully logged out" });
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.driver_phno,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secret, options);
};

const sendTrips = async (req, res) => {
  try {
    const driverId = await getLoggedInUserDriverId(req);
    const trips = await Trip.find({ assigned_driver: driverId, completed: false });
    res.status(200).json({ trips });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ message: "Error fetching trips" });
  }
};

const tripsCompleted = async (req, res, cb) => {
  const tripId = req.body.tripId;
  const endTime = req.body.endTime;

  try {
    const driverId = await getLoggedInUserDriverId(req);
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.assigned_driver.toString() !== driverId) {
      return res.status(403).json({ message: "Not authorized to complete this trip" });
    }

    // Calculate trip duration in hours
    const startTime = new Date(`1970-01-01T${trip.trip_starttime}`);
    const endTimeDate = new Date(`1970-01-01T${endTime}`);
    const tripDurationMs = endTimeDate - startTime;
    const tripDurationHours = tripDurationMs / (1000 * 60 * 60);

    // Update trip
    trip.trip_endtime = endTime;
    trip.completed = true;
    await trip.save();

    // Update driver's driving hours
    const driver = await Driver.findById(driverId);

    if (driver.driving_hrs === null) {
      driver.driving_hrs = tripDurationHours;
    } else {
      driver.driving_hrs += tripDurationHours;
    }

    await driver.save();
    console.log(`Driving hours successfully updated`);

    // Get company email for notification
    const company = await Company.findById(driver.c_id);
    const companyEmail = company.company_email;

    // Send email notification to company
    const mailOptions = {
      from: process.env.EMAIL,
      to: companyEmail,
      subject: 'Trip Completed',
      text: `Driver ${driver.driver_name} has completed a trip from ${trip.trip_arrivalcity} to ${trip.trip_destinationcity} on ${trip.trip_date}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: "Trip completed successfully" });
  } catch (error) {
    console.error("Error completing trip:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateDriversLicExp = async (req, res) => {
  try {
    const drivers = await Driver.find({});

    for (const driver of drivers) {
      const licExpDate = new Date(driver.driver_licesp);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((licExpDate - today) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry <= 30 && daysUntilExpiry > 0) {
        const company = await Company.findById(driver.c_id);

        const mailOptions = {
          from: process.env.EMAIL,
          to: company.company_email,
          subject: 'Driver License Expiring Soon',
          text: `Driver ${driver.driver_name}'s license will expire in ${daysUntilExpiry} days. Please ask them to renew it.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    }

    res.status(200).json({ message: "License expiry check completed" });
  } catch (error) {
    console.error("Error checking license expiry:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const resetDrivingHours = async () => {
  try {
    await Driver.updateMany({}, { $set: { driving_hrs: 0 } });
    console.log("Driving hours reset successfully");
  } catch (error) {
    console.error("Error resetting driving hours:", error);
  }
};

const sendDriverStatus = async () => {
  try {
    const drivers = await Driver.find({});

    for (const driver of drivers) {
      const company = await Company.findById(driver.c_id);

      const mailOptions = {
        from: process.env.EMAIL,
        to: company.company_email,
        subject: 'Weekly Driver Status Report',
        text: `Driver ${driver.driver_name} has completed ${driver.driving_hrs} hours of driving this week.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

    console.log("Driver status emails sent successfully");
  } catch (error) {
    console.error("Error sending driver status:", error);
  }
};

const getLoggedInUserDriverId = (req) => {
  const token = req.cookies.token;
  if (!token) {
    throw new Error("User not authenticated");
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return decodedToken.id;
};

export {
  login,
  logout,
  register,
  sendTrips,
  tripsCompleted,
  updateDriversLicExp,
  resetDrivingHours,
  sendDriverStatus
};
