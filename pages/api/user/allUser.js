import { User } from "@/models/user";
import { connectDb } from "@/helper/db";

connectDb();

export default async function GET(req, res) {
  let users = [ ];
  try {
    users = await User.find();
  } catch (error) {
    return res.status(400).json({ msg: "User not find !", success: false, error });
  }
  return res.status(200).json({ msg: "All Users find Successfully ", success: true, users });
}