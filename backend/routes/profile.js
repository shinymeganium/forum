import express from "express";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json(req.user);
});

export default router;