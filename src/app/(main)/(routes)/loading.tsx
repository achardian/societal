import PostSkeleton from "@/components/skeletons/post-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  const skeletons = new Array(5);

  return (
    <div className="flex flex-col gap-3 p-3">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
};

export default Loading;
