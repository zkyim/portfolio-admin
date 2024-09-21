import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request,) {
    try {
        
        const skills = await db.skill.findMany();

        return NextResponse.json(skills);
    }catch (err) {
        console.log("[GET_SKILLS_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}