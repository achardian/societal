import { NextResponse } from "next/server";

import db from "@/lib/db";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");

    if (name) {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
            {
              username: {
                contains: name,
                mode: "insensitive",
              },
            },
          ],
        },
      });

      return NextResponse.json(users, { status: 200 });
    }

    return NextResponse.json("Empty", { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
