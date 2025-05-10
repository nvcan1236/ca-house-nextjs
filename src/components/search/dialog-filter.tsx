import React, { useState } from "react"
import useFilterStore, { MAX_PRICE, MIN_PRICE } from "@/stores/filter-store"
import { RotateCcwIcon, SlidersHorizontalIcon } from "lucide-react"

import {
  facilities,
  furnitures,
  motelTypes,
  services,
} from "@/lib/predefined-data"

import H3 from "../common/h3"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"
import PriceRangeSlider from "./price-range-slider"

const DialogFilter = () => {
  const [open, setOpen] = useState<boolean>(false)
  const filter = useFilterStore()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={!!filter.applied ? "secondary" : "ghost"}
        >
          <SlidersHorizontalIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-10 min-w-[800px] ">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle>Tìm kiếm nhanh hơn với bộ lọc</DialogTitle>
          {!!filter.applied && (
            <Button
              variant={"secondary"}
              onClick={() => {
                filter.refreshFilter()
                setOpen(false)
              }}
            >
              <RotateCcwIcon size={20} className="mr-2" /> Làm mới
            </Button>
          )}
        </DialogHeader>
        <ScrollArea className="max-h-[500px] pr-4">
          <div className="flex flex-col gap-6 mt-6">
            <div>
              <H3>Loại phòng</H3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {motelTypes.map((type) => (
                  <div
                    className={`h-24 border text-main-blue-s2 flex flex-col items-center justify-center rounded-md ${
                      filter.roomType === type.value &&
                      "border-main-blue bg-main-blue-t9"
                    }`}
                    key={type.value}
                    onClick={() => filter.updateMotelType(type.value)}
                  >
                    {type.icon} <p className="text-sm mt-2">{type.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <H3>Khoảng giá</H3>
              <div>
                {/* <div className="h-[200px] mt-2">
                  <StatPriceBarChart data={data?.result.byPrice || []} />
                </div> */}
                <div className="max-w-full mx-auto mt-2 px-4">
                  <PriceRangeSlider
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={500000}
                    currentMin={filter.minPrice}
                    currentMax={filter.maxPrice}
                    onChange={(min, max) => {
                      filter.updatePrice(min, max)
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="flex-1">
                <H3>Dịch vụ</H3>
                <div className="ml-3 mt-1">
                  {Object.keys(services).map((serviceKey) => (
                    <div key={serviceKey}>
                      <Checkbox
                        checked={filter.amenities.includes(serviceKey)}
                        onCheckedChange={() => filter.updateAmenity(serviceKey)}
                        id={serviceKey}
                      />{" "}
                      <Label htmlFor={serviceKey}>
                        {services[serviceKey].label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <H3>Nội thất</H3>
                <div className="ml-3 mt-1">
                  {Object.keys(furnitures).map((furnitureKey) => (
                    <div key={furnitureKey}>
                      <Checkbox
                        checked={filter.amenities.includes(furnitureKey)}
                        onCheckedChange={() =>
                          filter.updateAmenity(furnitureKey)
                        }
                        id={furnitureKey}
                      />{" "}
                      <Label htmlFor={furnitureKey}>
                        {furnitures[furnitureKey].label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <H3>Tiện ích xung quanh</H3>
                <div className="ml-3 mt-1">
                  {Object.keys(facilities).map((facilityKey) => (
                    <div key={facilityKey}>
                      <Checkbox
                        checked={filter.amenities.includes(facilityKey)}
                        onCheckedChange={() =>
                          filter.updateAmenity(facilityKey)
                        }
                        id={facilityKey}
                      />{" "}
                      <Label htmlFor={facilityKey}>
                        {facilities[facilityKey].label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Button
                className="block ml-auto mt-6 px-10"
                onClick={() => {
                  filter.applyFilter()
                  setOpen(false)
                }}
              >
                Áp dụng
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default DialogFilter
