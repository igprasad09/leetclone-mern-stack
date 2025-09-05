const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { Users } = require("../models/db");
dotenv.config();

const routes = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Normal login
routes.post("/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body.user;

  try {
    const user = await Users.findOne({ email });

    if (user.otp == body.otp) {
      const payload = {
        email,
        password,
      };
      const token = jwt.sign(payload, JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true, // safer, not accessible from JS
        secure: false, // true if using HTTPS
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
      });
      return res.json({ message: "Login successful", user });
    } else {
      return res.json({ message: "OTP is not same Bro..." });
    }
  } catch (err) {
    return res.status(401).json({
      err,
    });
  }
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
    res.cookie("token", token, {
      httpOnly: true, // safer, not accessible from JS
      secure: false, // true if using HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
    });
    res.redirect("http://localhost:5173/dashboard"); // redirect to frontend
  }
);

routes.post("/sendotp", async (req, res) => {
  const email = req.body.email;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const userExists = await Users.findOne({ email });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vivek87228@gmail.com",
        pass: "ojpg abxd bijo zzoi",
      },
    });

    const info = await transporter.sendMail({
      from: '"Prasad" <vivek87228@gmail.com>',
      to: email,
      subject: "OTP from Prasad",
      text: `Your OTP is ${otp}`,
      html: ` <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
      <h2 style="color: #333;">Hello!</h2>
      <p>Use the following OTP to complete your verification:</p>
      <div style="font-size: 32px; font-weight: bold; color: #1a73e8; margin: 20px 0; letter-spacing: 5px;">
        ${otp}
      </div>
      <p style="color: #555;">This OTP is valid for <strong>10 minutes</strong>.</p>
      <hr style="margin: 20px 0; border-color: #ddd;">
      <p style="font-size: 12px; color: #999;">If you did not request this, please ignore this email.</p>
    </div>
`,
    });

    console.log("Message sent:", info.messageId, otp);

    if (!userExists) {
      await Users.create({
        username: "",
        email,
        password: "",
        otp,
      });
    } else {
      await Users.findOneAndUpdate(
        { email },
        {
          otp,
        }
      );
    }

    res.json({ email, message: "OTP sent", info: info.messageId });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to send email", details: err.message });
  }
});

module.exports = routes;
