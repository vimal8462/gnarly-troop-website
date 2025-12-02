import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT id,name,position_name as role,image as img,status FROM teams WHERE deleted_at is null
      
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
    const { name, position, imageUrl, status } = await req.json();
    if (!name || !position || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "INSERT INTO teams (name, position_name, image, status) VALUES (?, ?, ?,?)",
      [name, position, imageUrl, status]
    );

    return NextResponse.json({
      message: "Team inserted successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}
