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
      const user = await User.findById(req.params.id).select("-hash");
      if (!user)
        return res.status(404).json({ message: "user not found" });

      return res.status(200).json(user);
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ message: "internal server error" });
    }
  });

export default router;