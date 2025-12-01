import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT * FROM letter_from WHERE status=1 AND deleted_at is null
      
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
    const { letter_from, remarks, image, letter_image, status } = await req.json();
    if (!letter_from || !remarks || !image || !letter_image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "INSERT INTO letter_from (letter_from, remarks, image, letter_image, status) VALUES (?, ?, ?,?,?)",
      [letter_from, remarks, image, letter_image, status]
    );

    return NextResponse.json({
      message: "Letter from inserted successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}
