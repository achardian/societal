import { authOptions } from "@/lib/utils";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json("Unathorized", { status: 401 });

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        likeIds: {
          push: session.user.id,
        },
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("[LIKES POST]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user)
      return NextResponse.json("Unathorized", { status: 401 });

    const post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
    });

    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        likeIds: post?.likeIds.filter((id) => id !== session.user.id),
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("[LIKES POST]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
