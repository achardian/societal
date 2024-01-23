import ProfileBody from "@/components/profile-body";
import ProfileImg from "@/components/profile-img";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";

const getProfile = async (username: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    return error;
  }
};

const Page = async ({ params }: { params: { username: string } }) => {
  const user = await getProfile(params.username);

  if (!user) notFound();

  const profile = user as User;

  return (
    <div className="px-3 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center md:flex-row text-center md:text-left flex-1 gap-5">
          <ProfileImg src={profile.image as string} className="w-32 h-32" />
          <div className="flex-1 flex flex-col gap-1">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <span className="text-lg italic text-gray-800 dark:text-gray-100">
              @{profile.username}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Joined {format(profile.createdAt, "PP")}</span>
            </span>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-5 md:gap-3 w-[150px]">
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-semibold">Following</h2>
              <span>{profile.followings.length}</span>
            </div>
            <Separator className="hidden md:block" />
            <div className="flex flex-col items-center justify-center">
              <h2 className="font-semibold">Followers</h2>
              <span>{profile.followers.length}</span>
            </div>
          </div>
        </div>

        <Separator />

        <ProfileBody profile={profile} />
      </div>
    </div>
  );
};

export default Page;
