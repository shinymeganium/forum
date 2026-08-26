import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  editedAt: {
    type: String,
    required: true
  }
});

export default mongoose.model("Comment", commentSchema);