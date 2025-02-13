import React from "react"

import { IMotel } from "@/lib/types"
import MotelSkeleton from "@/components/motel/motel-skeleton"

import Motel from "./motel-card"

const MotelsList = () => {
  const motelList: IMotel[] = []

  if (true)
    // isFetching
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-8">
      {motelList?.map((motel) => {
        motel = {
          ...motel,
          images: motel.images.length > 0 ? [motel.images[0]] : motel.images,
        }
        return <Motel motel={motel} key={motel.id} />
      })}
    </div>
  )
}

export default MotelsList
