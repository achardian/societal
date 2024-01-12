import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[USER_ID]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return NextResponse.json("Unathorized", { status: 401 });

    const values = await req.json();
    const user = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        ...values,
      },
    });

    revalidatePath("/", "layout");

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log("[USER_ID]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
