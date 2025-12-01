"use server";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function PUT(req, context) {
  try {
     const params = await context.params;
     const id = params.id;
    const body = await req.json();
    const { name, email, password, status } = body;

    // Check email
    const [exists] = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, id]
    );

    if (exists.length > 0) {
      return Response.json(
        { error: "Email already in use by another user" },
        { status: 400 }
      );
    }

    // Hash password if provided
    let hashedPassword = null;
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Build query
    let query = "UPDATE users SET name=?, email=?, status=?";
    let values = [name, email, status];

    if (hashedPassword) {
      query += ", password=?";
      values.push(hashedPassword);
    }

    query += " WHERE id=?";
    values.push(id);

    await db.query(query, values);

    return Response.json({ message: "User updated successfully" });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req, content) {
  try {
    const params = await content.params;
     const id = params.id;
  console.log(id);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const [result] = await db.query(
      "UPDATE users SET status=?, deleted_at=? WHERE id = ?",
      [0, date, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed", details: error.toString() },
      { status: 500 }
    );
  }
}
