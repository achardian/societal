import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const PATCH = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const values = await req.json();
    await db.post.update({
      where: {
        id: params.postId,
      },
      data: {
        ...values,
      },
    });
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("[PATCH POST]", error);
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

    await db.post.delete({
      where: {
        id: params.postId,
      },
    });

    revalidatePath("/");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("[DELETE POST]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
