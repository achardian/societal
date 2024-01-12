import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import ProfileImg from "./profile-img";

const ProfileCard = async () => {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center p-5 border rounded-md">
      <ProfileImg src={user?.image || ""} className="h-20 w-20" />

      <span className="italic text-[15px] text-gray-500">
        @{user?.username}
      </span>
      <span className="text-[16px] font-semibold">{user?.name}</span>
      <Link
        href={`/profile/${user?.username}`}
        className="bg-blue-600 hover:bg-blue-500 w-full py-2 text-center rounded-md mt-3 text-white font-medium"
      >
        Visit
      </Link>
    </div>
  );
};

export default ProfileCard;
