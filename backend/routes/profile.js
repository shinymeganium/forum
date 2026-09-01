import express from "express";
import authenticateToken from "../middleware/auth.js";
import User from "../models/User.js";
import Thread from "../models/Thread.js";
import Comment from "../models/Comment.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-hash");
    const threadCount = await Thread.countDocuments({
      author: req.user.userId });
    const commentCount = await Comment.countDocuments({
      author: req.user.userId });

    return res.status(200).json({
      userId: user._id,
      username: user.username,
      joined: user.createdAt,
      role: user.role,
      threadCount,
      commentCount
    });
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