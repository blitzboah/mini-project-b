import db from "../database/db.js";
import { Router } from "express";
import express from "express";
import {
  login,
  logout,
  register,
  sendTrips,
  tripsCompleted,
} from "../controller/driver.controller.js";
import multer from "multer";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err);
      cb(null, `${hash.toString("hex")}-${file.originalname}`);
    });
  },
});

const upload = multer({ storage });

const router = Router();

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
        next();
      }
    });
  } else {
    console.log("No token found");
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/trips", isAuthenticated, sendTrips);
router.get("/login", (req, res) => {
  res.render("driverLogin.ejs");
});
router.get("/register", (req, res) => {
  res.render("driverReg.ejs");
});
router.get("/index", isAuthenticated, (req, res) => {
  res.render("driverIndex.ejs");
});
router.post("/login", login);
router.post("/register", upload.single("licensePhoto"), register);
router.post("/trips", tripsCompleted);
router.get("/logout", logout);

db.connect();

export default router;
