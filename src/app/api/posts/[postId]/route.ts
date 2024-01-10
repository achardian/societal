import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";

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
