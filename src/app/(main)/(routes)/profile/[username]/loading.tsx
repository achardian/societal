import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="px-3 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <Skeleton className="rounded-full w-32 h-32" />
          <div className="flex flex-col gap-2">
            <Skeleton className="p-3 w-[160px]" />
            <Skeleton className="p-2 w-[100px]" />
            <Skeleton className="p-2 w-[130px]" />
          </div>
        </div>

        <Separator />

        <Skeleton className="w-full p-4 rounded-sm" />

        <div className="flex flex-col gap-5">
          <Skeleton className="w-full h-[130px] rounded-sm" />
          <Skeleton className="w-full h-[130px] rounded-sm" />
          <Skeleton className="w-full h-[130px] rounded-sm" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
