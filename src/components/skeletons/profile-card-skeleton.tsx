import { Skeleton } from "../ui/skeleton";

const ProfileCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center p-5 border rounded-md">
      <Skeleton className="h-20 w-20 rounded-full" />
      <Skeleton className="p-2 w-[50px]" />
      <Skeleton className="w-full p-3 rounded-md" />
    </div>
  );
};

export default ProfileCardSkeleton;
