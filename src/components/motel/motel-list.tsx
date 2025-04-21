import React, { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useGetMotels } from "@/services/motelApi"
import useFilterStore from "@/stores/filter-store"

import { IMotel } from "@/types/motel"
import MotelSkeleton from "@/components/motel/motel-skeleton"

import DecorativeHeading from "../common/decorative-heading"
import Pagination from "../common/pagination"
import MotelCard from "./motel-card"

const MotelsList = () => {
  const pageParam = useSearchParams()
  const filter = useFilterStore()
  const page = Number(pageParam.get("page"))
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>()

  const { refetch: getMotels, isLoading } = useGetMotels({ page, filter })

  useEffect(() => {
    const fetchMotels = async () => {
      const { data } = await getMotels()

      setData(data)
    }
    fetchMotels()
  }, [filter.applied, page])

  const motelList: IMotel[] = data?.result.data || []

  if (isLoading || !motelList)
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
    <>
      <div>
        <DecorativeHeading>Tất cả</DecorativeHeading>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {motelList?.map((motel) => (
            <MotelCard
              motel={motel}
              key={motel.id}
              onClick={() => router.push(`/motels/${motel.id}`)}
            />
          ))}
        </div>
      </div>

      <Pagination
        current={data?.result.currentPage || 1}
        max={data?.result.totalPage || 1}
      />
      <div className="h-4"></div>
    </>
  )
}

export default MotelsList
