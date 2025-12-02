import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT *,LOWER(title) as ids FROM 4c_visions WHERE deleted_at is null
      
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
    const { title, icon,description, image } = await req.json();
    if (!title || !description || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "INSERT INTO 4c_visions (title, icon,description, image) VALUES (?, ?,?, ?)",
      [title, icon,description, image]
    );

    return NextResponse.json({
      message: "Vision inserted successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}
