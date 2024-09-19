import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", {status: 401})

    const { tool } = await req.json();
    if (!tool) return new NextResponse("Missing data", {status: 401})
      
    const skill = await db.skill.create({
      data: {
        tool,
      }
    });

    return NextResponse.json(skill);
  }catch (err) {
    console.log("[CREATE_SKILL_ERROR]", err);
    return new NextResponse("internal server error", {status: 500})
  }
}