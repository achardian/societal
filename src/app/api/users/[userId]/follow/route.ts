import { authOptions } from "@/lib/utils";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return NextResponse.json("Unathorized", { status: 401 });

    const addFollowings = db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        followings: {
          push: params.userId,
        },
      },
    });

    const addFollowers = db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        followers: {
          push: session.user.id,
        },
      },
    });

    await Promise.all([addFollowings, addFollowers]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("[FOLLOW POST]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id)
      return NextResponse.json("Unathorized", { status: 401 });

    const getFollowings = db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const getFollowers = db.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    const [followings, followers] = await Promise.all([
      getFollowings,
      getFollowers,
    ]);

    const addFollowings = db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        followings: followings?.followings.filter(
          (authorId) => authorId !== params.userId
        ),
      },
    });

    const addFollowers = db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        followers: followers?.followers.filter(
          (authorId) => authorId !== session.user.id
        ),
      },
    });

    await Promise.all([addFollowings, addFollowers]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("[FOLLOW DELETE]", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
