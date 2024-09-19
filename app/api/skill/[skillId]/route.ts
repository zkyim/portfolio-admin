import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {skillId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const body = await req.json();
        if (!body) return new NextResponse("Miss value", {status: 404});

        const values = {
            tool: body.tool,
            category: body.category,
            percentage: body.percentage,
        }

        const existEducation = await db.skill.findUnique({
            where: {
                id: params.skillId,
            },
        });
        if (!existEducation) return new NextResponse("Not found", {status: 404});

        const updated = await db.skill.update({
            where: {
                id: params.skillId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(updated);
    }catch (err) {
        console.log("PATCH_SKILL_ERROR", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}: {params: {skillId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const existEducation = await db.skill.findUnique({
            where: {
                id: params.skillId,
            },
        });
        if (!existEducation) return new NextResponse("Not found", {status: 404});

        const deleted = await db.skill.delete({
            where: {
                id: params.skillId,
            }
        });

        return NextResponse.json(deleted);
    }catch (err) {
        console.log("PATCH_SKILL_ERROR", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}