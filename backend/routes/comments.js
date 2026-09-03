import express from "express";
import Comment from "../models/Comment.js"
import Thread from "../models/Thread.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.route("/").
  get(async (req, res) => {
    try {
      const comments = await Comment.find().populate("author", "username").sort({ "createdAt": -1 }).limit(20);
      return res.status(200).json(comments);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  post(authenticateToken, async (req, res) => {
    try {
      const thread = await Thread.findById(req.body.threadId);
      if (!thread)
        return res.status(404).json({ message: "thread not found" });

      if (!req.body.content)
        return res.status(400).json({ message: "content is required" });

      const comment = new Comment({
        content: req.body.content,
        author: req.user.userId,
        threadId: req.body.threadId
      });

      await comment.save();
      return res.status(201).json({ message: "comment created" });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "internal server error" });
    }
  });

router.route("/:id").
  get(async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).populate("author", "username");
      if (!comment)
        return res.status(404).json({ message: "comment not found" });

      return res.status(200).json(comment);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  put(authenticateToken, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "comment not found" });

      if (comment.author.toString() !== req.user.userId)
        return res.status(403).json({ message: "access denied" });

      comment.content = req.body.content;
      await comment.save();

      return res.status(200).json({ message: "comment edited" });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  delete(authenticateToken, async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "comment not found" });

      if (comment.author.toString() !== req.user.userId)
        return res.status(403).json({ message: "access denied" });

      await comment.deleteOne();
      return res.status(200).json({ message: "comment deleted" });
    }
    catch(err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  });

export default router;