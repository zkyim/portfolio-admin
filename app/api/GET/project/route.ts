import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET( req: Request ) {
    try {
        const { searchParams } = new URL(req.url);
        const description = searchParams.get('description');
        const title = searchParams.get('title');

        const projects = await db.project.findMany({
            where: {
                isPublic: true,
                OR: [
                    {
                        title: {
                            contains: title || ""
                        }
                    },
                    {
                        description: {
                            contains: description || ""
                        }
                    }
                ]
            }, 
            include: {
                images: true,
            }
        })

        return NextResponse.json(projects);
    }catch (err) {
        console.log("[GET_PROJECTS_ERROR]", err);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}