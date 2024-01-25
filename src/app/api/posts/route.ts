import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { TPostSchema } from "@/schema/post-schema";
import db from "@/lib/db";
import { MediaType } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/", "layout");

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
    const userId = url.searchParams.get("userId");
    const skip = url.searchParams.get("skip");
    const isFollowing = url.searchParams.get("following_feed");
    const isBookmarks = url.searchParams.get("bookmarks");
    const isFavorites = url.searchParams.get("favorites");

    if (userId) {
      const posts = await db.post.findMany({
        where: {
          userId,
        },
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
    }

    if (isFollowing) {
      const posts = await db.post.findMany({
        where: {
          author: {
            followers: {
              has: session.user.id,
            },
          },
        },
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
    }

    if (isBookmarks) {
      const posts = await db.post.findMany({
        where: {
          saveIds: {
            has: session.user.id,
          },
        },
        include: {
          author: true,
          comments: true,
        },
      });

      return NextResponse.json(posts, { status: 200 });
    }

    if (isFavorites) {
      const posts = await db.post.findMany({
        where: {
          likeIds: {
            has: session.user.id,
          },
        },
        include: {
          author: true,
          comments: true,
        },
      });

      return NextResponse.json(posts, { status: 200 });
    }

    const posts = await db.post.findMany({
      where: {
        NOT: {
          author: {
            followers: {
              has: session.user.id,
            },
          },
        },
      },
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
