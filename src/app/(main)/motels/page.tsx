"use client"

import { Suspense, useState } from "react"
import { LayoutGridIcon, MapIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Map from "@/components/map/map"
import MotelsList from "@/components/motel/motel-list"
import MotelSkeleton from "@/components/motel/motel-skeleton"
import NearMotelList from "@/components/motel/near-motel-list"

const MotelsPage = () => {
  const [showMap, setShowMap] = useState<boolean>(false)

  return (
    <div className="relative">
      {showMap ? (
        <div className="min-h-screen">
          <div className="fixed inset-0 z-30">
            <Map />
          </div>
        </div>
      ) : (
        <div>
          <NearMotelList />
          <Suspense fallback={<MotelListFallback />}>
            <MotelsList />
          </Suspense>
        </div>
      )}
      <Button
        className="left-1/2 -translate-x-1/2 z-30 sticky bottom-4"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? (
          <>
            <LayoutGridIcon size={20} className="mr-2" /> Xem danh sách
          </>
        ) : (
          <>
            <MapIcon size={20} className="mr-2" /> Xem trên Map
          </>
        )}
      </Button>
    </div>
  )
}

const MotelListFallback = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <MotelSkeleton key={index} />
        ))}
    </div>
  )
}

export default MotelsPage
