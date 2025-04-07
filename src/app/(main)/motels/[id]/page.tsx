"use client"

import { useParams } from "next/navigation"
import { useGetMotel } from "@/services/motelApi"

import { IMotelDetail } from "@/types/motel"
import DetailMotelImages from "@/components/motel/detail/images"
import DetailMotelMain from "@/components/motel/detail/main-infor"
import DetailMotelAmenity from "@/components/motel/detail/motel-amenity"
import DetailMotelOwner from "@/components/motel/detail/owner"
import DetailMotelPrice from "@/components/motel/detail/price"
import DetailMotelRequirement from "@/components/motel/detail/requirement"
import DetailMotelAction from "@/components/motel/detail/reservation"
import DetailMotelReview from "@/components/motel/detail/review"
import DetailMotelSkeleton from "@/components/motel/detail/skeleton"

const DetailMotelPage = () => {
  const { id } = useParams()

  const { data, isFetching } = useGetMotel(id.toString())
  if (isFetching || !data?.result) return <DetailMotelSkeleton />
  const detailMotel: IMotelDetail = data?.result

  return (
    <div className="md:mt-10">
      <DetailMotelImages detailMotel={detailMotel} />
      <div className="flex gap-8 pt-10">
        <div className="flex-1 flex flex-col gap-6 ">
          <DetailMotelMain detailMotel={detailMotel} />

          <div className="lg:hidden">
            <DetailMotelPrice detailMotel={detailMotel} />
          </div>

          <DetailMotelAction detailMotel={detailMotel} />

          <DetailMotelAmenity detailMotel={detailMotel} />

          <DetailMotelRequirement detailMotel={detailMotel} />

          <DetailMotelOwner detailMotel={detailMotel} />
        </div>

        <div className="w-1/3 hidden lg:block">
          <DetailMotelPrice detailMotel={detailMotel} />
        </div>
      </div>

      <div className="mt-8">
        <DetailMotelReview detailMotel={detailMotel} />
      </div>
    </div>
  )
}

export default DetailMotelPage
