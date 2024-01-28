import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";

// create all the tasks
export default async function POST(req, res) {
  const { title, content, status, userId } = await req.body;
  try {
  
    if(userId) {
      const task = new Task({
        title,
        content,
        status,
        userId,
      });
      const createdTask = await task.save();
      return res.status(201).json({ msg: "task add successfully", createdTask });
    }
    else {
      return res.status(401).json({ msg: "Unauthorized access" });
    }
  } catch(error) {
    return res.status(401).json({ msg: "Failed to add task !", success: false, error });
  }

}