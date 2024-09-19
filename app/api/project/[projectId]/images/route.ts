import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, {params}: {params: {projectId: string}}) {
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", {status: 401});

        const { values } = await req.json();
        if ( !values ) return new NextResponse("Miss value", {status: 404});


        const create = await db.image.createMany({
            data: [
                ...values,
            ]
        })

        return NextResponse.json(create);
    }catch (err) {
        console.log("[POST_IMAGE_ERROR]", err);
        return new NextResponse("Internal server error", {status: 500})
    }
} 