import { Skeleton } from "../ui/skeleton";

const PostSketeton = () => {
  return (
    <div className="bg-background flex flex-col gap-3 border rounded-xl p-6 pb-4">
      <div className="h-10 flex gap-3">
        <Skeleton className="size-10" />
        <div className="space-y-2">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
        <Skeleton className="flex-1 ml-8" />
      </div>
      <Skeleton className="h-56" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="flex gap-3 h-10">
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
        <Skeleton className="flex-1" />
      </div>
    </div>
  );
};

export default PostSketeton;
