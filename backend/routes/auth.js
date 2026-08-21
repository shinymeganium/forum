const express = require("express");
const router = express.Router();
const User = require("../models/User.js")

router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    passwordHash: "temp",
    role: "user"
  });

  await user.save();

  res.json({
    message: "user saved"
  });
});

router.post("/login", (req, res) => {
  res.send("login")
});

module.exports = router;