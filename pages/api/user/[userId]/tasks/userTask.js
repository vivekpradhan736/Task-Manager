// localhost:3000/api/user/[userId]/tasks

import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";

export default async function GET(req, res) {
  const { userId } = req.query;

  try {
    // get user using id
    const tasks = await Task.find({ userId: userId, });
    if (!tasks || !tasks.length) {
      return res.status(401).json({ message: "No task found !", success: false });
    }
    else {
      return res.status(200).json({ message: "User all tasks find Successfully ", success: true, tasks });
    }
  } catch (error) {
    return getResponseMessage("Failed to get tasks", 404, false)
  }
}