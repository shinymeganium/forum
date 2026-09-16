import User from "../models/User.js";
import bcrypt from "bcrypt";

export const testUser = async () => {
  const existingUser = await User.findOne({ username: "test" });

  if (!existingUser) {
    const hash = await bcrypt.hash("123", 10);
    const user = new User({
        username: "test",
        email: "test@email.com",
        hash: hash,
        role: "user"
      });
      await user.save();
      console.log("test user created");
  }
  else
    console.log("test user already exists");
};