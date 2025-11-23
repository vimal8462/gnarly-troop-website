import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
    try {
        const body = await req.json();

        const sql = `
            INSERT INTO registrations 
            (registration_for, name, dob, pincode, state, email, tshirt_size, 
             amount, father_name, address, district, country, phone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            body.registration_for,
            body.name,
            body.dob,
            body.pincode,
            body.state,
            body.email,
            body.tshirt_size,
            body.amount,
            body.father_name,
            body.address,
            body.district,
            body.country,
            body.phone,
        ];
 
        await db.execute(sql, values);

        return NextResponse.json({ message: "Registration successful","status":true });
    } catch (error) {
        console.error("DB Insert Error:", error);
        return NextResponse.json(
            { message: "Error saving data" },
            { status: 500 }
        );
    }
}
