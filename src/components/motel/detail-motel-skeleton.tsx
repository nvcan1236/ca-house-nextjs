import { Skeleton } from "../ui/skeleton";

const DetailMotelSkeleton = () => {
  return (
    <div className="container w-[1200px] mt-10">
      <Skeleton className="h-[300px]"></Skeleton>
      <div className="flex mt-12 gap-8 items-start ">
        <div className="w-2/3 flex flex-col gap-6">
          <div>
            <div>
              <Skeleton className="h-[20px]"></Skeleton>
              <Skeleton className="h-[80px]"></Skeleton>

              <Skeleton className="h-[40px]"></Skeleton>
            </div>
            <Skeleton className="h-[120px]"></Skeleton>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton className="h-[60px]"></Skeleton>
            <Skeleton className="h-[60px]"></Skeleton>
          </div>
          <div>
            <Skeleton className="h-[160px]"></Skeleton>
          </div>
          <div>
            <Skeleton className="h-[160px]"></Skeleton>
          </div>
          <div>
            <Skeleton className="h-[160px]"></Skeleton>
          </div>
        </div>

        <div className="flex-1 sticky top-40">
          <Skeleton className="h-[200px]"></Skeleton>
          <Skeleton className="mt-4 h-[40px] bg-slate-400"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default DetailMotelSkeleton;
