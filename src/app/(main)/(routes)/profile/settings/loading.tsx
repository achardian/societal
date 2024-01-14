import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 py-5 px-3">
      <Skeleton className="w-40 h-40 rounded-full" />

      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-[100px] p-3" />
        <Skeleton className="w-full p-5" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-[100px] p-3" />
        <Skeleton className="w-full p-5" />
      </div>

      <div className="w-full flex flex-col gap-2">
        <Skeleton className="w-[100px] p-3" />
        <Skeleton className="w-full p-5" />
      </div>
    </div>
  );
};

export default Loading;
