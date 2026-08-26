import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).json({ message: "invalid username or password" });

    const matchPassword = await bcrypt.compare(req.body.password, user.hash);
    if (!matchPassword)
      return res.status(401).json({ message: "invalid username or password" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "14d" });

    return res.status(200).json({ token, role: user.role });
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;