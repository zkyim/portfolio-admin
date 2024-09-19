import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {Id: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const { type, value } = await req.json();
        if (!type) return new NextResponse("Miss data", {status: 401});

        let data;
        if (type === "education") {
            data = await db.education.update({
                where: {
                    id: params.Id,
                },
                data: {
                    isPublic: value,
                },
            });
        }else if (type === "skill") {
            data = await db.skill.update({
                where: {
                    id: params.Id,
                },
                data: {
                    isPublic: value,
                },
            });
        }else if (type === "project") {
            data = await db.project.update({
                where: {
                    id: params.Id,
                },
                data: {
                    isPublic: value,
                },
            });
        }

        return NextResponse.json(data);
    }catch (e) {
        console.log("[ERROR_PUBLISHING-FUNCTION]", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}