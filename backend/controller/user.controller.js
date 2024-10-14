import bcrypt from "bcrypt";
import db from "../database/db.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
          const verificationToken = crypto.randomBytes(32).toString('hex');
          const result = await db.query(
            "INSERT INTO company (company_name, company_address, company_email, company_phno, paswd, verification_token, email_verified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, address, email, phno, pass, verificationToken, false]
          );

          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.SMTP_PASSWORD
            }
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Verify your email address',
            text: `Please click on the following link to verify your email address: http://localhost:3000/api/users/verify-email?token=${verificationToken}`
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Email sent: ' + info.response);
          });

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

const verifyEmail = async (req, res) => {
  const token = req.query.token;
  try {
    const result = await db.query(
      "SELECT * FROM company WHERE verification_token = $1",
      [token]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Invalid verification token' });
    } else {
      const user = result.rows[0];
      await db.query(
        "UPDATE company SET email_verified = true, verification_token = null WHERE c_id = $1",
        [user.c_id]
      );
      res.status(200).json({ message: 'Email verified successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
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
      res.status(401).json({ message: 'User not registered. Please register first.' });
    } else {
      const user = isUserRegistered.rows[0];
      if (!user.email_verified) {
        res.status(401).json({ message: 'Email not verified. Please verify your email address.' });
      } else {
        const storedPassword = user.paswd;
        bcrypt.compare(password, storedPassword, async (err, result) => {
          if (err) {
            console.log(` ERROR!! in hashing the password `);
            res.status(500).json({ message: "Error while comparing the hash passwords!" });
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
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Side Error!!" });
  }
};

const assignTasks = async (req, res, cb) => {
  let tasksAssigned = false; 

  try {
    console.log("Starting assignTasks function");

    const tripDate = req.body.date;
    const arrivingCity = req.body.arrivingCity;
    const destinationCity = req.body.destinationCity;
    const startTime = req.body.startTime;

    if (!tripDate || !arrivingCity || !destinationCity || !startTime) {
      return res.status(400).json({ message: "Incomplete information." });
    }

    const companyId = await getLoggedInUserCompanyId(req);

    console.log("After getting company ID");

    const driverDetails = await db.query("SELECT * FROM drivers WHERE c_id = $1", [companyId]);
    const drivers = driverDetails.rows;

    if (drivers.length === 0) {
      return res.status(404).json({ message: "No verified drivers available." });
    }

    const tripdet = await db.query("INSERT INTO trips (c_id, trip_date, trip_arrivalcity, trip_destinationcity, trip_starttime) VALUES ($1, $2, $3, $4, $5) RETURNING trip_id", [companyId, tripDate, arrivingCity, destinationCity, startTime]);
    const tripId = tripdet.rows[0].trip_id;

    for (const driver of drivers) {
      if (driver.driving_hrs < 48) {
        await db.query(
          "INSERT INTO assigned_trips (d_id, trip_date, trip_arrivalcity, trip_destinationcity, trip_starttime, trip_id) VALUES ($1, $2, $3, $4, $5, $6)",
          [driver.d_id, tripDate, arrivingCity, destinationCity, startTime, tripId]
        );
        tasksAssigned = true;
        console.log("Tasks assigned successfully.");
        break;  // Exit loop after assigning to the first available driver
      }
    }

    console.log("After attempting to assign a driver");

    if (!tasksAssigned) {
      return res.status(404).json({ message: "No eligible driver found." });
    }

    return res.status(200).json({ message: "Tasks assigned successfully." });
  } catch (error) {
    console.error("Error assigning tasks:", error);
    return res.status(500).json({ message: "An error occurred while assigning tasks." });
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
    console.log(companyId)
    const result = await db.query("SELECT * FROM vehicles WHERE c_id=$1", [
      companyId,
    ]);
    const vehicles =result.rows;
    console.log(result);
    res.status(200).json({success:true,message:"Drivers sent successfully",vehicles,});
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
  verifyEmail,
  logout,
};
