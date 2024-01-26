import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

connectDb();

export default async function GET(req, res) {
  let users = [ ];
  try {
    users = await User.find();
  } catch (error) {
    return res.status(400).json({ message: "User not find !", success: false, error });
  }
  return res.status(200).json({ message: "All Users find Successfully ", success: true, users });
}