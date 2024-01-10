import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json("Unathorized", { status: 401 });

    const comments = await db.comment.findMany({
      where: {
        postId: params.postId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log("[COMMENTS GET]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json("Unathorized", { status: 401 });

    const { body } = await req.json();

    const comments = await db.comment.create({
      data: {
        postId: params.postId,
        body,
        userId: session.user.id,
      },
      include: {
        author: true,
      },
    });

    revalidatePath("/", "layout");

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.log("[COMMENTS POST]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
