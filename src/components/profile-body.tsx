"use client";

import { User } from "@prisma/client";
import ProfileAbout from "./profile-about";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import ProfilePosts from "./profile-posts";

const ProfileBody = ({ profile }: { profile: User }) => {
  const searchParams = useSearchParams();
  const postsTab = searchParams.get("posts_tab");
  const router = useRouter();

  return (
    <div>
      <div className="flex bg-gray-100 dark:bg-gray-800 rounded-sm overflow-clip">
        <button
          onClick={() => router.push(`/profile/${profile.username}`)}
          className={cn(
            "flex-1 py-2 font-semibold",
            !postsTab && "bg-gray-300 dark:bg-gray-900"
          )}
        >
          About
        </button>
        <button
          onClick={() =>
            router.push(`/profile/${profile.username}?posts_tab=open`)
          }
          className={cn(
            "flex-1 py-2 font-semibold",
            postsTab && "bg-gray-300 dark:bg-gray-900"
          )}
        >
          Posts
        </button>
      </div>

      {!postsTab && <ProfileAbout profile={profile} />}
      {postsTab && <ProfilePosts profileId={profile.id} />}
    </div>
  );
};

export default ProfileBody;
