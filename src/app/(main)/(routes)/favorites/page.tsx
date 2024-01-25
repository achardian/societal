"use client";

import OvalLoader from "@/components/oval-loader";
import Post from "@/components/post";
import { PostWithAuthorAndComment } from "@/types";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

const Favorites = () => {
  const getPosts = async ({ pageParam = 0 }: { pageParam: number }) => {
    try {
      const { data } = await axios.get(
        `/api/posts?skip=${pageParam}&favorites=true`
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const { ref, inView } = useInView({ threshold: 0 });

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 0 }) => getPosts({ pageParam }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length * 10 : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="px-3 py-5 flex flex-col items-center justify-center gap-3">
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

export default Favorites;
