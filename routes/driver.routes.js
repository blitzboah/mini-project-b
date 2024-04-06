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

const router = Router();

router.use(express.urlencoded({ extended: true }));
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/api/drivers/login");
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
router.post("/register", register);
router.post("/trips", tripsCompleted);
router.get("/logout", logout);

db.connect();

export default router;
