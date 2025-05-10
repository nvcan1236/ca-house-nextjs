"use client"

import { useState } from "react"
import { useCreateAmenity } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { toast } from "sonner"

import { Amenity } from "@/types/motel"
import { facilities, furnitures, services } from "@/lib/predefined-data"
import DecorativeHeading from "@/components/common/decorative-heading"

import H3 from "../../common/h3"
import AmenityItem from "./amenity-item"
import CreateProgress from "./create-progress"

type GroupAmenity = {
  services: string[]
  furnitures: string[]
  facilities: string[]
}

const getStringData = (grAmenity: GroupAmenity): Amenity[] => {
  const arrData: Amenity[] = []
  grAmenity.services.forEach((s) => arrData.push({ name: s, type: "SERVICE" }))
  grAmenity.furnitures.forEach((f) =>
    arrData.push({ name: f, type: "FURNITURE" })
  )
  grAmenity.facilities.forEach((f) =>
    arrData.push({ name: f, type: "FACILITY" })
  )
  return arrData
}

const AmenityInfo = () => {
  const { mutateAsync: createAmenity } = useCreateAmenity()
  const { id } = useCreateMotelStore()
  const { nextStep, detailMotel } = useCreateMotelStore()

  const initGrAmenity = {
    services: detailMotel?.amenities?.filter(a => a.type === "SERVICE").map(a => a.name) || [],
    furnitures: detailMotel?.amenities?.filter(a => a.type === "FURNITURE").map(a => a.name) || [],
    facilities: detailMotel?.amenities?.filter(a => a.type === "FACILITY").map(a => a.name) || [],
  }
  const [data, setData] = useState<GroupAmenity>(initGrAmenity)

  const updateData = (type: keyof GroupAmenity, value: string) => {
    const newData = { ...data }
    if (newData[type].includes(value)) {
      newData[type] = newData[type].filter((i) => i != value)
    } else {
      newData[type].push(value)
    }

    setData(newData)
  }

  const handleFetchAmenity = () => {
    const amenities = getStringData(data)
    if (id)
      createAmenity({ motelId: id, data: amenities })
        .then(() => {
          nextStep()
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
  }
  return (
    <div className="">
      <div className="">
        <div className="flex flex-col">
          <div className=" mb-12 flex-1 max-w-[800px] w-full mx-auto">
            <DecorativeHeading className="!text-2xl text-main-blue-s3 mb-10">
              Thông tin tiện nghi
            </DecorativeHeading>
            <div className="flex flex-col gap-8 mb-20">
              <div>
                <H3 className="text-foreground">Các dịch vụ bao gồm</H3>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {Object.values(services)?.map((service) => (
                    <AmenityItem
                      key={service.value}
                      label={service.label}
                      isActive={data["services"].includes(service.value)}
                      icon={service.icon}
                      onClick={() => updateData("services", service.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <H3 className="text-foreground">Nội thất trong phòng</H3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {Object.values(furnitures)?.map((furniture) => (
                    <AmenityItem
                      key={furniture.value}
                      label={furniture.label}
                      isActive={data["furnitures"].includes(furniture.value)}
                      icon={furniture.icon}
                      onClick={() => updateData("furnitures", furniture.value)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <H3 className="text-foreground">Các tiện ích xung quanh</H3>
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {Object.values(facilities)?.map((facility) => (
                    <AmenityItem
                      key={facility.value}
                      label={facility.label}
                      isActive={data["facilities"].includes(facility.value)}
                      icon={facility.icon}
                      onClick={() => updateData("facilities", facility.value)}
                    />
                  ))}
                </div>
              </div>

              <CreateProgress
                disableNext={
                  data.services.length === 0 &&
                  data.furnitures.length === 0 &&
                  data.facilities.length === 0
                }
                onNextClick={handleFetchAmenity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmenityInfo
