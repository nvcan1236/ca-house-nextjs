import React from "react"

import { Amenity, IMotelDetail } from "@/types/motel"
import { translations } from "@/lib/predefined-data"

import DecorativeHeading from "../../common/decorative-heading"
import { Label } from "../../ui/label"

const DetailMotelAmenity = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const amenityByType = detailMotel?.amenities.reduce<{ [key: string]: Amenity[] }>(
    (acc, item: Amenity) => {
      if (!item.type) return acc

      if (!acc[item.type]) {
        acc[item.type] = []
      }

      acc[item.type].push(item)

      return acc
    },
    {}
  )
  return (
    <div>
      <DecorativeHeading>Tiện nghi</DecorativeHeading>
      <div className="mt-4 pl-3">
        {/* {Object.keys(amenityByType).map()} */}
        {amenityByType &&
          Object.keys(amenityByType).map((type) => (
            <p key={type}>
              <Label>{translations[type]}:</Label>{" "}
              <div className="inline-block">
                {amenityByType[type].map((amenity) => (
                  <span key={amenity.name}>{translations[amenity.name]},</span>
                ))}
              </div>
            </p>
          ))}
      </div>
    </div>
  )
}

export default DetailMotelAmenity
