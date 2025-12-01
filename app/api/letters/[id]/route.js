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
      "UPDATE letter_from SET status=?, deleted_at=? WHERE id = ?",
      [0, date, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Letter from not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Letter from deleted successfully",
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

    const { letter_from, remarks, image, letter_image, status } = await req.json();
    if (!letter_from || !remarks || !image || !letter_image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "UPDATE letter_from SET letter_from=?, remarks=?, image=?, letter_image=?, status=? WHERE id =?",
      [letter_from, remarks, image, letter_image, status, id]
    );

    return NextResponse.json({
      message: "Letter from updated successfully",
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Insert failed", details: String(error) },
      { status: 500 }
    );
  }
}