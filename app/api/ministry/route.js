import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT * FROM ministries WHERE deleted_at is null
      
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
    const { title1, title2,description, image, status } = await req.json();
    if (!title1 || !title2 ||!description || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "INSERT INTO ministries (title1, title2,description, image, status) VALUES (?, ?, ?,?,?)",
      [title1, title2,description, image, status]
    );

    return NextResponse.json({
      message: "Ministry inserted successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}
