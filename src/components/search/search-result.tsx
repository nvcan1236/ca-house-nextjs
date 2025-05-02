import React, { FC } from "react"
import Link from "next/link"
import { useSearchMotel } from "@/services/motelApi"

import { cn } from "@/lib/utils"

import { ScrollArea } from "../ui/scroll-area"

const SearchResult: FC<{
  keyword: string
  className?: string
  hidden?: boolean
}> = React.memo(({ keyword, className, hidden = true }) => {
  const { data, isLoading } = useSearchMotel(keyword)
  return (
    <div
      className={cn(
        "bg-background p-4 rounded-md shadow",
        { hidden: hidden },
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading && <div className="animate-pulse">Đang tìm kiếm...</div>}
      <div className="text-sm text-gray-500">
        {data?.result.length ? data?.result.length : "Không có"} kết quả tìm
        kiếm cho{" "}
        <span className="bg-main-yellow-t6 font-medium">{keyword}</span>
      </div>

      <ScrollArea className="h-[200px]">
        {data?.result && (
          <div className="mt-3 space-y-2">
            {data.result.map((motel) => (
              <Link
                href={`/motels/${motel.id}`}
                key={motel.id}
                className="flex justify-between items-center hover:bg-main-blue-t9 transition-all px-3 py-1 rounded-sm"
              >
                <div className="flex-1 ">
                  <p className="line-clamp-1 overflow-ellipsis font-medium">
                    {motel.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {[motel.city, motel.district].join(", ")}
                  </p>
                </div>
                <div className="text-sm text-right">
                  <p>
                    {motel.area}m<sup>2</sup>
                  </p>
                  <p className="line-clamp-1 overflow-ellipsis">
                    {motel.price.toLocaleString()}đ/th
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
})

SearchResult.displayName = "SearchResult"

export default SearchResult
