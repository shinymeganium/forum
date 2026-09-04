import mongoose from "mongoose";

const threadSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    categories: {
      type: [String],
      default: []
    },
    comments: {
      type: Number,
      default: 0
    }
},
{
  timestamps: true
});

export default mongoose.model("Thread", threadSchema);