import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import Cookies from "js-cookie";

export default async function GET(request, res) {
  const authToken = request.cookies["authToken"];
  if (!authToken) {
    return res.status(400).json({ msg: "user is not logged in !!", success: false, });
  }
  const data = jwt.verify(authToken, process.env.JWT_KEY);
  const user = await User.findById(data._id).select("-password");
  return res.status(200).json({ msg: "Current user found successfully", success: true, user });
}