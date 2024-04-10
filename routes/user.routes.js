import db from "../database/db.js";
import { Router } from "express";
import express from "express";
import {
  assignTasks,
  login,
  logout,
  regiserVehicles,
  register,
  sendDrivers,
  sendVehicels,
} from "../controller/user.controller.js";
import jwt from "jsonwebtoken";

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

router.post("/login", login);
router.post("/register", register);
router.post("/trips", isAuthenticated, assignTasks);
router.post("/registerVehicle", isAuthenticated, regiserVehicles);
router.get("/viewDrivers", isAuthenticated, sendDrivers);
router.get("/logout", isAuthenticated, logout);
router.get("/viewVehicles", isAuthenticated, sendVehicels);

db.connect();

export default router;
