const router = require("express").Router();
const User = require("../models/User.js")

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;