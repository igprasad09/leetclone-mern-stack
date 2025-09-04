const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

const routes = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Normal login
routes.post("/login", (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, JWT_SECRET);
  res.cookie("token", token);
  res.json({ message: "Login successful" });
});

// Verify with passport-jwt
routes.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: req.user });
  }
);

// Google login start
routes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
routes.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const token = jwt.sign(req.user, JWT_SECRET);
    res.cookie("token", token);
    res.redirect("http://localhost:5173/dashboard"); // redirect to frontend
  }
);

module.exports = routes;
