import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, {params}: {params: {educationId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const body = await req.json();
        if (!body) return new NextResponse("Miss value", {status: 404});

        const values = {
            title: body.title,
            description: body.description,
            year: body.date,
        }

        const existEducation = await db.education.findUnique({
            where: {
                id: params.educationId,
            },
        });
        if (!existEducation) return new NextResponse("Not found", {status: 404});

        const updated = await db.education.update({
            where: {
                id: params.educationId,
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(updated);
    }catch (err) {
        console.log("PATCH_EDUCATION_ERROR", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}
export async function DELETE(req: Request, {params}: {params: {educationId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const existEducation = await db.education.findUnique({
            where: {
                id: params.educationId,
            },
        });
        if (!existEducation) return new NextResponse("Not found", {status: 404});

        const deleted = await db.education.delete({
            where: {
                id: params.educationId,
            }
        });

        return NextResponse.json(deleted);
    }catch (err) {
        console.log("[DELETE_EDUCATION_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}