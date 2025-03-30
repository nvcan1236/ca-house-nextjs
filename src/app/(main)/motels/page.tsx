"use client"

import { useState } from "react"
import { LayoutGridIcon, MapIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Pagination from "@/components/common/pagination"
import Map from "@/components/map/map"
import MotelsList from "@/components/motel/motel-list"

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
          <MotelsList />
          
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

export default MotelsPage
