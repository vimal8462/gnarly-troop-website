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
      "UPDATE timeline SET status=?, deleted_at=? WHERE id = ?",
      [0, date, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Timeline not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Timeline deleted successfully",
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

    const { title, details, year, flag_marker, city, subcity, status } = await req.json();
    if (!title || !details || !year || !flag_marker || !city || !subcity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "UPDATE timeline SET title=?, details=?, year=?, flag_marker=?, city=?, subcity=?, status=? WHERE id =?",
      [title, details, year, flag_marker, city, subcity, status, id]
    );

    return NextResponse.json({
      message: "Timeline updated successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}