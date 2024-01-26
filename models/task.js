import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter your title"],
  },
  content: {
    type: String,
    required: [true, "Please enter your description"],
  },
  addedDate: {
    type: Date,
    default: Date.now(),
    required: [true, "Please enter your added date"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const Task = mongoose.models.task || mongoose.model("task", taskSchema);
