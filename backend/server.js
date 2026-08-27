import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
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

// middleware - parses json requests bodies
app.use(express.json());
// parses form data
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "ok"
  });
});

app.use("/register", registerRouter);

app.use("/login", loginRouter);

app.use("/profile", profileRouter);

app.use("/users", usersRouter);

app.use("/threads", threadsRouter);

app.use("/comments", commentsRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});