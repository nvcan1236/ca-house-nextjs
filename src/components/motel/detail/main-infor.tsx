import React from "react"
import { MapPinIcon, MapPinnedIcon } from "lucide-react"

import { IMotelDetail, Location } from "@/types/motel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const formatAddressMotel = (location: Location) => {
  return (
    [
      location?.other,
      location?.street,
      location?.ward,
      location?.district,
    ].reduce((acc, curr) => {
      if (curr) curr = acc = acc + curr + ", "
      return acc
    }) + location?.city
  )
}

const DetailMotelMain = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  
  return (
    <div>
      <div>
        <h3 className="text-3xl ">{detailMotel?.name}</h3>
        <p className="font-light text-slate-600">{detailMotel?.description}</p>

        <div className="text-xl font-medium mt-5 flex justify-between items-center gap-3">
          <span>
            <MapPinnedIcon className="inline-block mr-3" />{" "}
            {formatAddressMotel(detailMotel.location)}
          </span>
          <Button variant={"outline"} className="flex -gap-2">
            <MapPinIcon size={20} />{" "}
            <span className="hidden lg:inline">Xem trên bản đồ</span>
          </Button>
        </div>
      </div>
      <div className="py-6 px-2 rounded-xl border border-main-yellow-t6 flex bg-background mt-4">
        <div className="flex-1 flex flex-col gap-4 items-center">
          <Label className="text-slate-500">Diện tích</Label>{" "}
          <span className="font-medium text-lg">{detailMotel?.area}m2</span>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center">
          <Label className="text-slate-500">Loại phòng</Label>{" "}
          <Badge className="px-4 bg-main-yellow-t6 hover:bg-main-yellow text-main-blue-s3 font-normal text-md pb-1">
            {detailMotel?.type.toLowerCase()}
          </Badge>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center">
          <Label className="text-slate-500">Phòng trống từ</Label>{" "}
          <span className="font-medium text-lg">
            {detailMotel?.availableDate
              ? new Date(detailMotel?.availableDate).toLocaleDateString("vi")
              : "Bây giờ"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelMain
