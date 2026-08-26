import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
});

router.route("/:id").
  get(async (req, res) => {
    try {
      const user = await User.findOne(req.body._id);
      return res.status(200).json(user);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "internal server error" });
    }
  }).
  put((req, res) => {
    try {

    }
    catch (err) {

    }
  });

export default router;