import { Skeleton } from "../ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col border gap-3 p-3">
      <div className="flex gap-3">
        <Skeleton className="rounded-full w-14 h-14" />
        <div className="flex flex-col gap-1">
          <Skeleton className="w-[150px] rounded-sm p-2" />
          <Skeleton className="w-[100px] rounded-sm p-2" />
        </div>
      </div>
      <Skeleton className="w-full p-2" />
    </div>
  );
};

export default PostSkeleton;
