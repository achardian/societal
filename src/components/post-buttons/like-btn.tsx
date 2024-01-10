"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "react-query";

const LikeBtn = ({ likes, postId }: { likes: string[]; postId: string }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(
    likes.includes(session?.user.id as string)
  );
  const [likesCount, setLikesCount] = useState(likes.length);

  const queryClient = useQueryClient();

  const handleLike = async () => {
    try {
      if (isLiked) {
        const { data } = await axios.delete(`/api/posts/${postId}/likes`);
        return data;
      } else {
        const { data } = await axios.post(`/api/posts/${postId}/likes`);
        return data;
      }
    } catch (error) {
      return error;
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: handleLike,
    onMutate: () => {
      if (isLiked) {
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      } else {
        setIsLiked(true);
        setLikesCount(likesCount + 1);
      }
    },
    onError: () => {
      if (isLiked) {
        setLikesCount(likesCount + 1);
        setIsLiked(true);
      } else {
        setLikesCount(likesCount - 1);
        setIsLiked(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return (
    <button
      onClick={() => mutateAsync()}
      className="p-1 rounded-full flex items-center gap-2"
    >
      <Heart
        fill={isLiked ? "#E11D48" : "transparent"}
        className={cn(
          "h-4 w-4 hover:text-rose-600",
          isLiked ? "text-rose-600" : "text-gray-500"
        )}
      />
      <span className="text-gray-500 text-[12px]">
        {likesCount > 0 && likesCount}
      </span>
    </button>
  );
};

export default LikeBtn;
