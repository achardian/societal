"use client";

import { PostWithAuthorAndComment } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import Post from "./post";
import OvalLoader from "./oval-loader";
import PostSkeleton from "./skeletons/post-skeleton";

const ProfilePosts = ({ profileId }: { profileId: string }) => {
  const { ref, inView } = useInView();

  const getProfilePosts = async ({ pageParam = 0 }) => {
    try {
      const { data } = await axios.get(
        `/api/posts?userId=${profileId}&skip=${pageParam}`
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const { hasNextPage, data, isFetchingNextPage, fetchNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["profile-posts"],
      queryFn: ({ pageParam = 0 }) => getProfilePosts(pageParam),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length * 10 : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isFetching)
    return (
      <div className="flex flex-col gap-3 mt-3">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );

  return (
    <div className="px-3 py-5 flex flex-col items-center justify-center gap-3">
      {data?.pages.map((page: PostWithAuthorAndComment[]) =>
        page.map((post, i) =>
          page.length === i + 1 ? (
            <Post key={post?.id} post={post} ref={ref} />
          ) : (
            <Post key={post?.id} post={post} />
          )
        )
      )}
      {isFetchingNextPage && hasNextPage && <OvalLoader />}
    </div>
  );
};

export default ProfilePosts;
