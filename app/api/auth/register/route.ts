// import { connectDB } from "@/lib/mongodb";
// import User from "@/lib/User";
// import bcrypt from "bcryptjs";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { name, email, password } = await req.json();
//     if (!name || !email || !password) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     await connectDB();

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     return NextResponse.json(
//       { message: "User registered successfully" },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

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
