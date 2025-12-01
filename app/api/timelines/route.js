import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        year,
        flag_marker AS country,
        CONCAT(city, ' ', subcity) AS city,
        details,status,id,city as cities,subcity,title
      FROM timeline
      WHERE status =1 AND deleted_at is null
      ORDER BY year ASC
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
    const { title, details, year, flag_marker, city, subcity, status } = await req.json();
    if (!title || !details || !year || !flag_marker || !city || !subcity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "INSERT INTO timeline (title, details, year, flag_marker, city, subcity, status) VALUES (?, ?, ?,?,?,?,?)",
      [title, details, year, flag_marker, city, subcity, status]
    );

    return NextResponse.json({
      message: "Timeline inserted successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}

