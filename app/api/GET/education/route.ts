import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request,) {
    try {
        
        const education = await db.education.findMany();

        return NextResponse.json(education);
    }catch (err) {
        console.log("[GET_EDUCATION_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}