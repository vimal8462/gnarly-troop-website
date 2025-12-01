import { NextResponse } from "next/server";
import { db } from "@/lib/db";   //  REQUIRED

export async function DELETE(req,content){
 try{
 const params = await content.params;
     const id = params.id;
     const date = new Date().toISOString().slice(0, 19).replace("T", " ");
     await db.query("UPDATE 4c_visions SET status=?, deleted_at=? WHERE id=?", [0,date,id]);

    return Response.json({ message: "Vision deleted successfully" });
 }catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
export async function PUT(req, content) {
  try {
    const params = await content.params;
     const id = params.id;
    const body = await req.json();
    const { title, description, image, status } = body;

    await db.query(
      "UPDATE 4c_visions SET title=?, description=?, image=?, status=? WHERE id=?",
      [title, description, image, status, id]
    );

    return NextResponse.json({ message: "Vision updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Update failed", details: error.toString() },
      { status: 500 }
    );
  }
}