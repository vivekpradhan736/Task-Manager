import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

connectDb();
// signup user
export default async function handler(req, res) {
  if (req.method === "POST") {
    // fetch user details from request
    const { name, email, password, profileURL } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: "User already Registered !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user object with user model
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profileURL,
    });
    // save user to database
    // user.password = await bcrypt.hash(user.password, 12)
    const createdUser = await user.save();
    const token = jwt.sign({ token: createdUser._id }, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    return res.status(201).json({ msg: "Registered Successfully !", token });
  }
}