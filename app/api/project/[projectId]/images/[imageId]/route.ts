import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {projectId: string; imageId: string}}) {
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

        const deleted = await db.image.delete({
            where: {
                id: params.imageId,
            }
        });
        return NextResponse.json(deleted);
    }catch (err) {
        console.log("[DELETE_IMAGE_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}