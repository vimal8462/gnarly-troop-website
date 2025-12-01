import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT * FROM users WHERE deleted_at is null
      
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("DB ERROR:", error); //Will show full MySQL error in terminal
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Get user by email
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const user = rows[0];

    // Compare password (hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // OPTIONAL: Create JWT or set cookie
    // (Let me know if you want JWT auth)

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: "https://ui-avatars.com/api/?name=Anoop+Singh",
      },
    });
  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
