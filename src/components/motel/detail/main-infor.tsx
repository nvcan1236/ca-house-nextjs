import React from "react"
import { MapPinIcon, MapPinnedIcon } from "lucide-react"
import { Marker } from "react-map-gl"

import { IMotelDetail, Location } from "@/types/motel"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import MapForDetail from "@/components/map/map-for-detail"

import MotelMarker from "../motel-marker"
import MotelTypeBadge from "../motel-type.badge"

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

          <Dialog modal>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                className="flex -gap-2"
                disabled={
                  !detailMotel?.location?.latitude ||
                  !detailMotel?.location?.longitude
                }
              >
                <MapPinIcon size={20} />{" "}
                <span className="hidden lg:inline">Xem trên bản đồ</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[1000px] flex justify-center items-center">
              <div className="relative w-[980px] h-[600px]">
                <MapForDetail
                  currentLat={detailMotel?.location?.latitude || undefined}
                  currentLon={detailMotel?.location?.longitude || undefined}
                >
                  {detailMotel?.location?.latitude &&
                    detailMotel?.location?.longitude && (
                      <Marker
                        longitude={detailMotel.location.longitude}
                        latitude={detailMotel.location.latitude}
                      >
                        <MotelMarker
                          motel={{
                            ...detailMotel,
                          }}
                        />
                      </Marker>
                    )}
                </MapForDetail>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="py-6 px-2 rounded-xl border border-main-yellow-t6 flex bg-background mt-4 shadow">
        <div className="flex-1 flex flex-col gap-4 items-center">
          <Label className="text-slate-500">Diện tích</Label>{" "}
          <span className="font-medium text-lg">{detailMotel?.area}m<sup>2</sup></span>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-center">
          <Label className="text-slate-500">Loại phòng</Label>{" "}
          <MotelTypeBadge type={detailMotel.type} />
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
