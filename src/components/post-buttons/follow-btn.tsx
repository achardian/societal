"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

const FollowBtn = ({
  followers,
  authorId,
}: {
  followers: string[];
  authorId: string;
}) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isFollowed, setIsFollowed] = useState(
    followers.includes(session?.user.id as string)
  );

  const followUser = async () => {
    try {
      const { data } = await axios.post(`/api/users/${authorId}/follow`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const unfollowUser = async () => {
    try {
      const { data } = await axios.delete(`/api/users/${authorId}/follow`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: isFollowed ? unfollowUser : followUser,
    onMutate: () => {
      setIsFollowed((prev) => !prev);
    },
    onError: () => {
      setIsFollowed((prev) => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      router.refresh();
    },
  });

  if (session?.user.id === authorId) return null;

  return (
    <button
      onClick={() => mutateAsync()}
      className={cn(
        "text-[13px] font-semibold py-1 px-3 rounded-full w-fit",
        isFollowed
          ? "text-red-600 bg-red-600/15"
          : "text-blue-500 bg-blue-500/15"
      )}
    >
      {isFollowed ? "unfollow" : "Follow"}
    </button>
  );
};

export default FollowBtn;
