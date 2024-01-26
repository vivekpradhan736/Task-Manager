import { NextResponse } from "next/server";
import { User } from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";
import Cookies from "js-cookie";

export default async function handler(req, res) {
    if (req.method === "POST") {
        connectDb();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "All Fields are Mandatory !" });
  }
    // 1.get user
    const user = await User.findOne({email: email,});
    if (!user) {
        return res.status(400).json({ msg: "user not found !!" });
    }
    // 2.password check
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return res.status(400).json({ msg: "Password not matched !!" });
    }

    // 3. generate token
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
    return res.status(200).json({ msg: "Logged in successfully !", token, user });
}
}
