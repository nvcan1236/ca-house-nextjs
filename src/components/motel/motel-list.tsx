import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import useFilterStore from "@/stores/filter-store"

import { IMotel } from "@/types/motel"
import MotelSkeleton from "@/components/motel/motel-skeleton"

import MotelCard from "./motel-card"
import { useGetMotels } from "@/services/motelApi"

const MotelsList = () => {
  const pageParam = useSearchParams()
  const filter = useFilterStore()
  const page = Number(pageParam.get("page"))
  const router = useRouter()

  const { data, isFetching } = useGetMotels({ page, filter })
  const motelList: IMotel[] = data?.result.data || []

  if (isFetching)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <MotelSkeleton key={index} />
          ))}
      </div>
    )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {motelList?.map((motel) => {
        motel = {
          ...motel,
          images: motel.images.length > 0 ? [motel.images[0]] : motel.images,
        }
        return (
          <MotelCard
            motel={motel}
            key={motel.id}
            onClick={() => router.push(`/motels/${motel.id}`)}
          />
        )
      })}
    </div>
  )
}

export default MotelsList
