import { connectDB } from "@/lib/mongodb";
import User from "@/lib/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email }); // ✅ now works
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "User created", user: newUser });
}
