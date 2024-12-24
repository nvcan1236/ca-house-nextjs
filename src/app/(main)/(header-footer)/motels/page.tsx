"use client"

import { useState } from "react"
import { LayoutGridIcon, MapIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import Pagination from "@/components/common/pagination"
import Map from "@/components/map/map"
import MotelsList from "@/components/motel/motel-list"

// import { useSearchParams } from "next/navigation";

const MotelsPage = () => {
  const [showMap, setShowMap] = useState<boolean>(false)
  // const pageParam = useSearchParams();
  // const filter = useAppSelector((state) => state.filter);

  // const { data, isFetching } = useGetMotelsQuery({
  //   page: Number(pageParam.get("page")),
  //   filter,
  // });

  // const motelList: IMotel[] = data?.result.data || [];

  return (
    <div className="">
      {showMap ? (
        <div className="fixed inset-0 z-30">
          <Map />
        </div>
      ) : (
        <div>
          <MotelsList />
          <Pagination current={1} max={1} />
        </div>
      )}

      <Button
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30"
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
