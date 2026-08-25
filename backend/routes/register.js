import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const password = req.body.password;
  // salt protects from rainbow table attacks
  // how much work bcrypt does while hashing
  const saltRounds = 10;
  // random data - users with same password get different hashes
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    passwordHash: hash,
    role: "user"
  });

  await user.save();

  res.json({
    message: "user saved"
  });
});

export default router;