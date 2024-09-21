import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {projectId: string;}}) {
    try {
        if (!params.projectId) return new NextResponse("Not Found", {status: 404});

        const project = await db.project.findUnique({
            where: {
                id: params.projectId,
            },
            include: {
                images: true,
            },
        });

        if (!project) return new NextResponse("Not Found", {status: 404});

        return NextResponse.json(project);
    }catch (e) {
        console.log("[GET_PROJECT_ERROR]", e);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}