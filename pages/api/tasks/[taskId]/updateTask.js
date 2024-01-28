import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";

// update single tasks
export default async function PUT(req, res) {
    try {
      const { taskId } = req.query;
  
      const { title, content, status } = await req.body;
  
      let task = await Task.findById(taskId);
  
      task.title = title
      task.content = content
      task.status = status
  
      const updatedTask = await task.save();
      return res.status(200).json({ msg: "Task update Successfully ", success: true, updatedTask });
    } catch (error) {
      return res.status(404).json({ msg: "Error in updating task !!", success: false, error });
    }
  }