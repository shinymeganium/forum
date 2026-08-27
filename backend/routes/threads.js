import express from "express";
import Thread from "../models/Thread.js";
import Comment from "../models/Comment.js";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.route("/").
  get(async (req, res) => {
    try {
      //await Thread.deleteMany();
      const threads = await Thread.find().sort({ "createdAt": -1 }).limit(20);
      return res.status(200).json(threads);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  post(authenticateToken, async (req, res) => {
    try {
      const post = new Thread({
        title: req.body.title,
        content: req.body.content,
        author: req.user.userId,
        categories: "temp"
      });

      await post.save();
      return res.status(201).json({ message: "thread created" });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  });

router.route("/:id").
  get(async (req, res) => {
    try {
      const thread = await Thread.findById(req.params.id);
      if (!thread)
        return res.status(404).json({ message: "thread not found" });

      return res.status(200).json(thread);
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  put(authenticateToken, async (req, res) => {
    try {
      // demonstrating authorization check before editing
      const thread = await Thread.findById(req.params.id);

      if (!thread)
        return res.status(404).json({ message: "thread not found" });

      if (thread.author.toString() !== req.user.userId)
        return res.status(403).json({ message: "access denied" });

      thread.title = req.body.title;
      thread.content = req.body.content;
      await thread.save();

      return res.status(200).json({ message: "thread edited" });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  delete(authenticateToken, async (req, res) => {
    try {
      // demonstrating authorization check before deleting
      const thread = await Thread.findById(req.params.id);

      if (!thread)
        return res.status(404).json({ message: "thread not found" });

      if (thread.author.toString() !== req.user.userId)
        return res.status(403).json({ message: "access denied" });

      await thread.deleteOne();
      return res.status(200).json({ message: "thread deleted" });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "internal server error" });
    }
  });

  router.route("/:id/comments").
    get(async (req, res) => {
      try {
        const comments = await Comment.find().sort({ "createdAt": -1 }).limit(20);
        return res.status(200).json(comments);
      }
      catch (err) {
        console.log(err);
        return res.status(500).json({ message: "internal server error" });
      }
    });

export default router;