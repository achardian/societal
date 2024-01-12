import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array(10).map((item, i) => (
        <Skeleton key={i} className="h-[230px] w-full rounded-md" />
      ))}
    </div>
  );
};

export default Loading;
