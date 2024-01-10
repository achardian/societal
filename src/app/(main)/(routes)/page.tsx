"use client";

import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Post from "@/components/post";
import { PostWithAuthorAndComment } from "@/types";
import OvalLoader from "@/components/oval-loader";

const Home = () => {
  const getPosts = async ({ pageParam = 0 }: { pageParam: number }) => {
    try {
      const { data } = await axios.get(`/api/posts?skip=${pageParam}`);
      return data;
    } catch (error) {
      return error;
    }
  };

  const { ref, inView } = useInView({ threshold: 0 });

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
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
  }, [inView, hasNextPage]);

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
      {isFetchingNextPage && <OvalLoader />}
    </div>
  );
};

export default Home;
