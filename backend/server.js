require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongodb"))
.catch(err => console.error(err));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "ok"
  });
});

const authRouter = require("./routes/auth.js");
app.use("/api/auth", authRouter);

const usersRouter = require("./routes/users.js");
app.use("/api/users", usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});