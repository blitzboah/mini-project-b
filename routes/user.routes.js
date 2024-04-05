import db from "../database/db.js";
import { Router } from "express";
import express from "express";
import { assignTasks, login, register } from "../controller/user.controller.js";

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
router.post("/login", login);
router.post("/register", register);
router.post("/trips", isAuthenticated, assignTasks);
router.get("/drivers", (req, res) => {
  res.redirect("/api/drivers/login");
});

db.connect();

export default router;