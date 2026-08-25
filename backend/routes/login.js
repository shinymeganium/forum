import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("login")
});

export default router;