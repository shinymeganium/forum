require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongodb"))
.catch(err => console.error(err));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "ok"
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});