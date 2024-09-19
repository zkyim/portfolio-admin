import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {projectId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const body = await req.json();
        if (!body) return new NextResponse("Miss value", {status: 404});

        const values = {
            title: body.title,
            description: body.description,
            tools: body.tools,
            githubUrl: body.githubUrl,
            demo: body.demo,
            isResponsible: body.isResponsible,
            published_At: body.date,
        }

        const existproject = await db.project.findUnique({
            where: {
                id: params.projectId,
            },
        });
        if (!existproject) return new NextResponse("Not found", {status: 404});

        const updated = await db.project.update({
            where: {
                id: params.projectId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(updated);
    }catch (err) {
        console.log("PATCH_PROJECT_ERROR", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}: {params: {projectId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const existproject = await db.project.findUnique({
            where: {
                id: params.projectId,
            },
        });
        if (!existproject) return new NextResponse("Not found", {status: 404});

        const deleted = await db.project.delete({
            where: {
                id: params.projectId,
            }
        });

        return NextResponse.json(deleted);
    }catch (err) {
        console.log("[DELETE_PROJECT_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}