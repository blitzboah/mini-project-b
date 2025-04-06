import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Company from "../models/Company.js";
import Driver from "../models/Driver.js";
import Vehicle from "../models/Vehicle.js";
import Trip from "../models/Trip.js";

const saltRounds = 10;

const generateToken = (user) => {
  const payload = {
    id: user._id,
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
  // Validate required fields
  if (!name || !phno || !address || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const existingCompany = await Company.findOne({
      $or: [{ company_email: email }, { company_name: name }]
    });

    if (existingCompany) {
      return res.status(409).json({ message: "Email already exists. Try logging in." });
    } else {
      try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Hashed Password:", hashedPassword);
        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newCompany = new Company({
          company_name: name,
          company_address: address,
          company_email: email,
          company_phno: phno,
          paswd: hashedPassword,
          verification_token: verificationToken,
          email_verified: false
        });

        await newCompany.save();

        // Try to send verification email, but don't fail registration if email fails
        try {
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

          await transporter.sendMail(mailOptions);
          console.log('Verification email sent successfully');
        } catch (emailError) {
          console.error('Failed to send verification email:', emailError);
          // Continue with registration even if email fails
        }

        console.log(`User is registered successfully.`);
        return res.status(201).json({
          success: true,
          message: `User was registered Successfully`,
        });
      } catch (error) {
        console.log(`User was not able to register: ${error.message}`);
        return res.status(500).json({ message: "Error registering user" });
      }
    }
  } catch (err) {
    console.error("Error in register route:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token;
  try {
    const company = await Company.findOne({ verification_token: token });

    if (!company) {
      res.status(404).json({ message: 'Invalid verification token' });
    } else {
      company.email_verified = true;
      company.verification_token = null;
      await company.save();
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
    const company = await Company.findOne({ company_email: email });

    if (!company) {
      console.log(`User is not registered! please register yourself first`);
      res.status(401).json({ message: 'User not registered. Please register first.' });
    } else {
      if (!company.email_verified) {
        res.status(401).json({ message: 'Email not verified. Please verify your email address.' });
      } else {
        const storedPassword = company.paswd;
        bcrypt.compare(password, storedPassword, async (err, result) => {
          if (err) {
            console.log(` ERROR!! in hashing the password `);
            res.status(500).json({ message: "Error while comparing the hash passwords!" });
          } else {
            if (result) {
              console.log(`User successfully logged in`);
              const token = generateToken(company);
              res.cookie("token", token, {
                httpOnly: true,
                maxAge: 3600000,
              });
              res.status(200).json({
                success: true,
                message: `User was logged in Successfully`,
                user: company,
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

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const sendDrivers = async (req, res) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const drivers = await Driver.find({ c_id: companyId }).select('driver_name driver_licno driver_phno');
    res.status(200).json({ drivers });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    res.status(500).json({ message: "Error fetching drivers" });
  }
};

const sendVehicels = async (req, res) => {
  try {
    const companyId = await getLoggedInUserCompanyId(req);
    const vehicles = await Vehicle.find({ c_id: companyId });
    res.status(200).json({ vehicles });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Error fetching vehicles" });
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

    const drivers = await Driver.find({ c_id: companyId });

    if (drivers.length === 0) {
      return res.status(404).json({ message: "No verified drivers available." });
    }

    const newTrip = new Trip({
      c_id: companyId,
      trip_date: tripDate,
      trip_arrivalcity: arrivingCity,
      trip_destinationcity: destinationCity,
      trip_starttime: startTime
    });

    await newTrip.save();

    for (const driver of drivers) {
      if (driver.driving_hrs < 48) {
        newTrip.assigned_driver = driver._id;
        await newTrip.save();
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
    console.error("Error in assignTasks:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const regiserVehicles = async (req, res, cb) => {
  const vin = req.body.busNumber;
  const permitExpiry = req.body.permitExpiry;
  console.log(req.body);
  const companyId = await getLoggedInUserCompanyId(req);
  try {
    const newVehicle = new Vehicle({
      v_vin: vin,
      v_perexp: permitExpiry,
      c_id: companyId
    });

    await newVehicle.save();
    res.status(200).send("Vehicle was successfully Registered!!");
  } catch (error) {
    if (error) {
      res.status(500).send("There was some issue on the Server Side");
    }
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

export {
  register,
  login,
  logout,
  verifyEmail,
  sendDrivers,
  sendVehicels,
  assignTasks,
  regiserVehicles
};
