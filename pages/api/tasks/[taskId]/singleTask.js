import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";

// get single tasks
export default async function GET(req, res) {
  const { taskId } = req.query;
  try {
    if(taskId) {
      // find the task by id
      const task = await Task.findById(taskId);
      return res.status(200).json({ msg: "Task find Successfully ", success: true, task });
    }
    else {
      return res.status(404).json({ msg: "Task not find !", success: false, });
    }
  } catch (error) {
    return res.status(404).json({ msg: "Error in getting task !!", success: false, error });
  }
}