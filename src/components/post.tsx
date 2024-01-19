"use client";

import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import ReactPlayer from "react-player";

import { PostWithAuthorAndComment } from "@/types";
import LikeBtn from "./post-buttons/like-btn";
import CommentBtn from "./post-buttons/comment-btn";
import { convertDate } from "@/lib/utils";
import SaveBtn from "./post-buttons/save-btn";
import PostMenu from "./post-menu";
import ProfileImg from "./profile-img";

type Ref = HTMLDivElement;

const PostCard = ({ post }: { post: PostWithAuthorAndComment }) => {
  return (
    <div className="border p-3 rounded-md w-full flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex items-start gap-2">
          <ProfileImg src={post.author.image || ""} className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold">
              {post?.author.name}
            </span>
            <Link
              href={`/profile/${post.author.username}`}
              className="text-[12px] text-gray-500 hover:text-blue-600"
            >
              @{post.author.username}
            </Link>
          </div>
        </div>

        <PostMenu authorId={post.author.id} postId={post.id} />
      </div>
      <p>{post.content}</p>
      {post.mediaType === "IMAGE" && (
        <div className="relative w-full h-[220px]">
          <Image
            src={post.mediaUrl as string}
            alt="img-media"
            fill
            className="object-contain"
          />
        </div>
      )}
      {post.mediaType === "VIDEO" && (
        <ReactPlayer url={post.mediaUrl as string} controls width="100%" />
      )}

      <div className="flex justify-between items-center border-t pt-3">
        <div className="flex items-center gap-3">
          <LikeBtn likes={post.likeIds} postId={post.id} />
          <CommentBtn comments={post.comments.length} postId={post.id} />
          <SaveBtn postId={post.id} saveIds={post.saveIds} />
        </div>
        <small className="text-gray-500">{convertDate(post.createdAt)}</small>
      </div>
    </div>
  );
};

const Post = forwardRef<Ref, { post: PostWithAuthorAndComment }>(
  ({ post }, ref) => {
    return ref ? (
      <div ref={ref} className="w-full">
        <PostCard post={post} />
      </div>
    ) : (
      <div className="w-full">
        <PostCard post={post} />
      </div>
    );
  }
);

Post.displayName = "Post";

export default Post;
