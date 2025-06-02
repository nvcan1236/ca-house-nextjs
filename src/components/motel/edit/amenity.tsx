import React from "react"
import { PlusIcon, XIcon } from "lucide-react"

import { IMotelDetail } from "@/types/motel"
import { facilities, furnitures, services } from "@/lib/predefined-data"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const Amenity = ({
  editedMotel,
}: {
  editedMotel?: Partial<IMotelDetail>
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}) => {
  const servicesData =
    editedMotel?.amenities?.filter((a) => a.type === "SERVICE") || []
  const furnituresData =
    editedMotel?.amenities?.filter((a) => a.type === "FURNITURE") || []
  const facilitiesData =
    editedMotel?.amenities?.filter((a) => a.type === "FACILITY") || []
  return (
    <div>
      <div className="flex justify-between items-center">
        <Label htmlFor="description" className="text-right">
          Amenity
        </Label>
        <Button variant={"secondary"} size={"sm"}>
          <PlusIcon className="mr-2" /> Thêm tiện nghi
        </Button>
      </div>

      <div>
        <div className="mt-4 pl-3 space-y-4">
          <div>
            <Label className="text-sm font-medium">Dịch vụ:</Label>{" "}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
              {servicesData?.map((service) => (
                <div
                  key={service.name}
                  className="px-6 flex items-center gap-3 py-2 border rounded-md text-sm min-h-[60px] border-main-yellow-t6 bg-white font-medium text-main-blue relative"
                >
                  {services?.[service.name]?.icon}
                  {services?.[service.name]?.label}
                  <XIcon
                    className="inline-block cursor-pointer absolute right-1 top-1"
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Nội thất: </Label>{" "}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
              {furnituresData.map((fur) => (
                <div
                  key={fur.name}
                  className="px-6 flex items-center gap-3 py-2 border rounded-md text-sm min-h-[60px] border-main-yellow-t6 bg-white font-medium text-main-blue relative"
                >
                  {furnitures?.[fur.name]?.icon}
                  {furnitures?.[fur.name]?.label}
                  <XIcon
                    className="inline-block cursor-pointer absolute right-1 top-1"
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Tiện ích khác:</Label>{" "}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
              {facilitiesData.map((fac) => (
                <div
                  key={fac.name}
                  className="px-6 flex items-center gap-3 py-2 border rounded-md text-sm min-h-[60px] border-main-yellow-t6 bg-white font-medium text-main-blue relative"
                >
                  {facilities?.[fac.name]?.icon}
                  {facilities?.[fac.name]?.label}
                  <XIcon
                    className="inline-block cursor-pointer absolute right-1 top-1"
                    size={20}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Amenity
