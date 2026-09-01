import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import registerRouter from "./routes/register.js";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import threadsRouter from "./routes/threads.js";
import profileRouter from "./routes/profile.js";
import commentsRouter from "./routes/comments.js";

const app = express();

console.log("connecting to mongodb");
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("connected to mongodb"))
.catch(err => console.error(err));

//await mongoose.connection.dropDatabase();

app.use(cors());

// middleware - parses json requests bodies
app.use(express.json());
// parses form data
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "ok"
  });
});

app.use("/api/register", registerRouter);

app.use("/api/login", loginRouter);

app.use("/api/profile", profileRouter);

app.use("/api/users", usersRouter);

app.use("/api/threads", threadsRouter);

app.use("/api/comments", commentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});