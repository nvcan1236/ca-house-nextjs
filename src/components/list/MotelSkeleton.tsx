import { Skeleton } from "../ui/skeleton";

const MotelSkeleton = () => {
  return (
    <div className="overflow-hidden border rounded-lg shadow-sm bg-background">
      <div className="p-2">
        <Skeleton className="w-full h-[160px]"></Skeleton>
      </div>
      <div className="p-3">
        <Skeleton className="w-full h-6"></Skeleton>
        <Skeleton className="w-[120px] h-6 mt-2"></Skeleton>
      </div>
    </div>
  );
};

export default MotelSkeleton;