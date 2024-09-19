import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request,) {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse("Unauthorized", {status: 401})

    const { title } = await req.json();
    if (!title) return new NextResponse("Missing data", {status: 401})
      
    const project = await db.project.create({
      data: {
        title,
      }
    });

    return NextResponse.json(project);
  }catch (err) {
    console.log("[CREATE_PROJECT_ERROR]", err);
    return new NextResponse("internal server error", {status: 500})
  }
}