import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {projectId: string; imageId: string;}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const existingData = await db.image.findUnique({
            where: {
                id: params.imageId,
                projectId: params.projectId,
            }
        });
        if (!existingData) return new NextResponse("Not found", {status: 404});

        await db.image.updateMany({
            where: {
                projectId: params.projectId,
            },
            data: {
                isMain: false,
            }
        });

        const updatedData = await db.image.update({
            where: {
                id: params.imageId,
                projectId: params.projectId,
            },
            data: {
                isMain: true,
            },
        });

        return NextResponse.json(updatedData);
    }catch (err) {
        console.log("[MAIN_IMAGE_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}