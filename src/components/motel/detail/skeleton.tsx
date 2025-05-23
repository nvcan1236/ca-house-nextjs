import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/layout/container"

const DetailMotelSkeleton = () => {
  return (
    <Container className="mt-10 bg-background py-8 rounded-lg">
      <Skeleton className="h-[300px]"></Skeleton>
      <div className="flex mt-12 gap-8 items-start ">
        <div className="w-2/3 flex flex-col gap-6">
          <div className="space-y-4">
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
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
    </Container>
  )
}

export default DetailMotelSkeleton
