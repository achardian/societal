"use client";

import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Post from "@/components/post";
import { PostWithAuthorAndComment } from "@/types";
import OvalLoader from "@/components/oval-loader";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const searchParams = useSearchParams();
  const isFollowing = searchParams.get("following_feed");

  const getPosts = async ({ pageParam = 0 }: { pageParam: number }) => {
    try {
      const { data } = await axios.get(
        `/api/posts?skip=${pageParam}&${isFollowing && "following_feed=true"}`
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const { ref, inView } = useInView({ threshold: 0 });

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length * 10 : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    } else {
      refetch();
    }
  }, [inView, hasNextPage, fetchNextPage, isFollowing, refetch]);

  console.log(data);
  return (
    <div className="px-3 py-5 flex flex-col items-center justify-center gap-3">
      {isRefetching && isFollowing && <OvalLoader />}
      {data?.pages.map((page: PostWithAuthorAndComment[]) =>
        page?.map((post, i) =>
          page.length === i + 1 ? (
            <Post key={post?.id} post={post} ref={ref} />
          ) : (
            <Post key={post?.id} post={post} />
          )
        )
      )}
      {isFetchingNextPage && <OvalLoader />}
    </div>
  );
};

export default Home;
