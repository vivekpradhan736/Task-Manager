import { User } from "@/models/user";
import { NextResponse } from "next/server";


// Get Single User
export async function GET(req, res) {
  const { userId } = req.query;
  let user = {};
  if(userId) {
    user = await User.findById(userId);
  }
  else {
    return res.status(400).json({ msg: "User not find !", success: false, });
  }
  return res.status(200).json(user);
}

// Delete User
export async function DELETE(req, res, { params }) {
  const { userId } = params;
  if(userId) {
    const checkUserId = await User.findById(userId);
    if(!checkUserId) {
      return res.status(400).json({ msg: "User not find !", success: false, });
    }
    // delete user
    await User.deleteOne({ _id: userId });
    return res.status(200).json({ msg: "User deleted successfully", success: true, });
  }
  else {
    return res.status(400).json({ msg: "Not found user ID !", success: false, });
  }
}

// Update User
export default async function PUT(req, res, { params }) {
  const { userId } = params;
  const { name, email, password, about, profileURL } = await req.body;
  try {
    const user = await User.findById(userId);
    user.name = name;
    user.email = email;
    user.password = password;
    user.about = about;
    user.profileURL = profileURL;

    const updatedUser = await user.save();
    return res.status(200).json({ msg: "User update successfully", success: true, updatedUser });
  } catch (error) {
    return res.status(400).json({ message: "User not updated", success: false, error });
  }
}
