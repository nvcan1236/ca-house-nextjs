import React from "react"

import { IMotelDetail } from "@/types/motel"
import { facilities, furnitures, services } from "@/lib/predefined-data"

import DecorativeHeading from "../../common/decorative-heading"
import { Label } from "../../ui/label"

const DetailMotelAmenity = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const servicesData = detailMotel.amenities.filter((a) => a.type === "SERVICE")
  const furnituresData = detailMotel.amenities.filter(
    (a) => a.type === "FURNITURE"
  )
  const facilitiesData = detailMotel.amenities.filter(
    (a) => a.type === "FACILITY"
  )
  return (
    <div>
      <DecorativeHeading>Tiện nghi</DecorativeHeading>
      <div className="mt-4 pl-3 space-y-4">
        <div>
          <Label className="text-base font-medium">Dịch vụ:</Label>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {servicesData.map((service) => (
              <div
                key={service.name}
                className="px-6 flex items-center gap-3 py-2 border rounded-md text-sm min-h-[60px] border-main-yellow-t6 bg-white font-medium text-main-blue"
              >
                {services[service.name].icon}
                {services[service.name].label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Nội thất: </Label>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {furnituresData.map((fur) => (
              <div
                key={fur.name}
                className="px-6 flex items-center gap-3 py-2 border rounded-md text-sm min-h-[60px] border-main-yellow-t6 bg-white font-medium text-main-blue"
              >
                {furnitures[fur.name].icon}
                {furnitures[fur.name].label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Tiện ích khác:</Label>{" "}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
            {facilitiesData.map((fac) => (
              <div
                key={fac.name}
                className="px-6 flex items-center gap-3 py-2 border rounded-md text-sm min-h-[60px] border-main-yellow-t6 bg-white font-medium text-main-blue"
              >
                {facilities[fac.name].icon}
                {facilities[fac.name].label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelAmenity
