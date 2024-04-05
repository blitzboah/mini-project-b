import db from "../database/db.js";
import { Router } from "express";
import express from "express";
import {
  login,
  logout,
  register,
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

router.get("/login", (req, res) => {
  res.render("driverLogin.ejs");
});
router.get("/register", (req, res) => {
  res.render("driverReg.ejs");
});
router.get("/index", isAuthenticated, (req, res) => {
  res.render("index.ejs");
});
router.post("/login", login);
router.post("/register", register);
router.post("/trips", isAuthenticated, tripsCompleted);
router.get("/logout", logout);
router.get("/company", (req, res) => {
  res.redirect("/api/users/login");
});

db.connect();

export default router;
