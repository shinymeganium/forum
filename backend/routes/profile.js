import express from "express";
import authenticateToken from "../middleware/auth.js";
import Thread from "../models/Thread.js";
import Comment from "../models/Comment.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    return res.status(200).json(req.user);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/threads", authenticateToken, async (req, res) => {
  try {
    const threads = await Thread.find({ author: req.user.userId }).sort({ "createdAt": -1 }).limit(20);
    return res.status(200).json(threads);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

router.get("/comments", authenticateToken, async (req, res) => {
  try {
    const comments = await Comment.find({ author: req.user.userId }).sort({ "createdAt": -1 }).limit(20);
    return res.status(200).json(comments);
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

export default router;