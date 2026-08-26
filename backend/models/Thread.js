import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  editedAt: {
    type: String
  }
});

export default mongoose.model("Thread", threadSchema);