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

const router = Router();

router.use(express.urlencoded({ extended: true }));
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/api/users/login");
  }
};

router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.get("/index", isAuthenticated, (req, res) => {
  res.render("companyIndex.ejs");
});
router.post("/login", login);
router.post("/register", register);
router.post("/trips", isAuthenticated, assignTasks);
router.get("/drivers", (req, res) => {
  res.redirect("/api/drivers/login");
});
router.get("/viewDrivers", isAuthenticated, sendDrivers);
router.get("/logout", logout);
router.get("/registerVehicle", (req, res) => {
  res.render("vehicleRegistration.ejs");
});
router.post("/registerVehicle", regiserVehicles);
router.get("/viewVehicles",isAuthenticated,sendVehicels)

db.connect();

export default router;
