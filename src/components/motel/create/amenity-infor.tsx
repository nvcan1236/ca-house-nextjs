"use client"

import { useState } from "react"
import { useCreateAmenity } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { toast } from "sonner"

import { Amenity } from "@/types/motel"
import { facilities, furnitures, services } from "@/lib/predefined-data"
import DecorativeHeading from "@/components/common/decorative-heading"

import H3 from "../../common/h3"
import { Button } from "../../ui/button"
import AmenityItem from "./amenity-item"

type GroupAmenity = {
  services: string[]
  furnitures: string[]
  facilities: string[]
}

const initGrAmenity = {
  services: [],
  furnitures: [],
  facilities: [],
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
  const [data, setData] = useState<GroupAmenity>(initGrAmenity)
  const { nextStep, prevStep } = useCreateMotelStore()

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
                  {services?.map((service) => (
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
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {furnitures?.map((furniture) => (
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
                  {facilities?.map((facility) => (
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

              <div className="flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
                <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
                  Quay lại
                </Button>
                <Button size={"lg"} onClick={handleFetchAmenity}>
                  Tiếp tục
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmenityInfo
