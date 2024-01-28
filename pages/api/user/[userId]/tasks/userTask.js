// localhost:3000/api/user/[userId]/tasks

import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";

export default async function GET(req, res) {
  const { userId } = req.query;

  try {
    // get user using id
    const tasks = await Task.find({ userId: userId, });
    if (!tasks || !tasks.length) {
      return res.status(401).json({ msg: "You have no task", success: false });
    }
    else {
      return res.status(200).json({ msg: "User all tasks find Successfully ", success: true, tasks });
    }
  } catch (error) {
    return res.status(401).json({ msg: "Failed to get tasks !", success: false, error });
  }
}