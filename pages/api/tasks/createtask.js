import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";


// create all the tasks
export default async function POST(req, res) {
  const { title, content, userId, status } = await req.body;

  // fetching logged in user id
  // const authToken = Cookies.get("authToken");
  // const data = jwt.verify(authToken, process.env.JWT_KEY);

  if(userId) {
    const task = new Task({
      title,
      content,
      // userId: data._id,
      userId,
      status,
    });
    const createdTask = await task.save();
    return res.status(201).json({ msg: "task add successfully", createdTask });
  }
  else {
    return res.status(401).json({ msg: "Unauthorized access" });
  }
}