"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ProfileCard = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center p-5 border rounded-md">
      <div className="relative h-20 w-20 rounded-full overflow-clip">
        <Image
          src={session?.user?.image || ""}
          alt="user-img"
          fill
          className="object-cover"
        />
      </div>

      <span className="italic text-[15px] text-gray-500">
        @{session?.user.username}
      </span>
      <span className="text-[16px] font-semibold">{session?.user.name}</span>
      <Link
        href={`/profile/${session?.user.username}`}
        className="bg-blue-600 hover:bg-blue-500 w-full py-2 text-center rounded-md mt-3 text-white font-medium"
      >
        Visit
      </Link>
    </div>
  );
};

export default ProfileCard;
