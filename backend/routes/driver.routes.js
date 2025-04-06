import { Router } from "express";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import {
  login,
  logout,
  register,
  sendTrips,
  tripsCompleted,
  updateDriversLicExp
} from "../controller/driver.controller.js";
import jwt from "jsonwebtoken";

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token:", token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(`Error verifying token: ${err}`);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        console.log("Decoded token:", decoded);
        req.user = decoded.user;
        res.status(200).json({ message: "The user is authenticated" });
        next();
      }
    });
  } else {
    console.log("No token found");
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.post("/login", login);
router.post("/register", upload.single("licensePhoto"), register);
router.post("/logout", logout);
router.get("/trips", sendTrips);
router.post("/updateTripEndTime", tripsCompleted);
router.patch("/updateDriverLicExp", updateDriversLicExp);

export default router;
