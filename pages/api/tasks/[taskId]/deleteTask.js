import { Task } from "@/models/task";

// delete single tasks
export default async function DELETE(req, res) {
    const { taskId } = req.query;
    try {
      if(taskId) {
        const task = await Task.findById(taskId);
        if(!task) {
          return res.status(404).json({ msg: "Task not find !", success: false, });
        }
        await Task.deleteOne({
          _id: taskId,
        });
        return res.status(200).json({ message: "Task Deleted Successfully ", success: true });
      }
      else {
        return res.status(404).json({ msg: "Task not find !", success: false, });
      }
    } catch (error) {
      return res.status(404).json({ message: "Error in deleting Task !", success: false, error });
    }
  }