import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";

//get all the tasks
export default async function handler(req, res) {
  if (req.method === "GET") {
      const tasks = await Task.find();
      return res.status(200).json(tasks);
  }
  else {
    return res.status(404).json({ msg: "Error in getting tasks !!", });
  }
}