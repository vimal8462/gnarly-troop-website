"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req, content) {
  try {
    const params = await content.params;
    const id = params.id;
    console.log(id);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(
      "UPDATE teams SET status=?, deleted_at=? WHERE id = ?",
      [0, date, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Team from not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team from deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed", details: error.toString() },
      { status: 500 }
    );
  }
}
export async function PUT(req, content) {
  try {
    const params = await content.params;
    const id = params.id;

    const { name, position, imageUrl, status } = await req.json();
    if (!name || !position || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "UPDATE teams SET name=?, position_name=?, image=?, status=? WHERE id =?",
      [name, position, imageUrl, status, id]
    );

    return NextResponse.json({
      message: "Team updated successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Update failed", details: String(error) },
      { status: 500 }
    );
  }
}