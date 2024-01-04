import db from "@/lib/db";
import { TRegisterSchema } from "@/schema/register-schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const { name, username, email, password }: TRegisterSchema =
      await req.json();

    const checkEmail = db.user.findFirst({
      where: {
        email,
      },
    });

    const checkUsername = db.user.findFirst({
      where: {
        username,
      },
    });

    const [emailExist, usernameExist] = await Promise.all([
      checkEmail,
      checkUsername,
    ]);

    if (emailExist)
      return NextResponse.json("Email already in use", { status: 400 });
    if (usernameExist)
      return NextResponse.json("Username already in use", { status: 400 });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const image = `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;

    await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        image,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("[REGISTER]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
