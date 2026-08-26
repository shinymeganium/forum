import express from "express";
import Thread from "../models/Thread.js";

const router = express.Router();

router.route("/").
  get(async (req, res) => {
    try {
      const threads = await Thread.find().sort({ "createdAt": -1 }).limit(20);
      return res.status(200).json(threads);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "internal server error" });
    }
  })

export default router;