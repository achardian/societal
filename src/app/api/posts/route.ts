import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { TPostSchema } from "@/schema/post-schema";
import db from "@/lib/db";
import { MediaType } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return NextResponse.json("Unathorized", { status: 401 });

    const { content, mediaUrl, mediaType }: TPostSchema = await req.json();

    await db.post.create({
      data: {
        userId: session.user.id,
        content,
        mediaUrl,
        mediaType: mediaType as MediaType,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("[POST POSTS]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return NextResponse.json("Unathorized", { status: 401 });

    const url = new URL(req.url);
    const skip = url.searchParams.get("skip");

    const posts = await db.post.findMany({
      skip: Number(skip),
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        comments: true,
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log("[GET POSTS]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
