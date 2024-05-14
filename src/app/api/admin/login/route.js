import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateToken } from "@/utility/JwtTokenHelper";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
export const POST = async (req, res, next) => {
  try {
    let { email, password } = await req.json();
    console.log(email, password);
    const result = await prisma.users.findUnique({
      where: { email: email },
    });
    if (!result) {
      return NextResponse.json({
        code: 400,
        status: "fail",
        message: "সঠিক ইমেইল এবং সঠিক পাসওয়ার্ড দিন",
      });
    }
    if (!result?.role == "admin") {
      return NextResponse.json({
        status: "fail",
        message: "Authentication failed",
      });
    }

    const match = await bcrypt.compare(password, result?.password);
    if (!match) {
      return NextResponse.json({
        status: "fail",
        message: "Incorrect password",
      });
    }

    let token = await CreateToken(result["email"], result["id"]);
    let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const cookieString = `token=${token}; expires=${expireDuration.toUTCString()} ;path=/`;
    return NextResponse.json({
      status: "fail",
      code: 200,
      user: result,
      token: token,
      message: "user Login successful",
    });
  } catch (err) {
    console.log(err?.message);
    return NextResponse.json({
      status: "fail",
      code: 4001,
      message: "user Login  fail",
    });
  }
};