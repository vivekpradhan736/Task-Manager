import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export default async function POST(req, res) {
  Cookies.remove("authToken");
  res.setHeader('Set-Cookie', 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly');
  return res.status(200).json({ msg: 'Logout successful', success: true });
}