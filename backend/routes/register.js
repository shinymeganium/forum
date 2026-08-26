import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    const existingEmail = await User.findOne({ email: req.body.email });

    // check if username or email already exists in db
    if (existingUser) 
      return res.status(409).json({ message: "username already exists"});
    if (existingEmail)
      return res.status(409).json({ message: "email already exists" });

    const password = req.body.password;
    // salt protects from rainbow table attacks
    // how much work bcrypt does while hashing
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      hash: hash,
      role: "user"
    });

    await user.save();

    return res.status(201).json({ message: "user saved" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;