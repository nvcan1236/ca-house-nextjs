"use client"

import { useState } from "react"
import Image from "next/image"
import { useCreatePrice } from "@/services/motelUtilApi"
import { useCreateMotelStore } from "@/stores/create-motel-store"
import { PlusIcon, XIcon } from "lucide-react"
import { toast } from "sonner"

import { Price, PriceType } from "@/types/motel"
import { prices as predefinedPrices } from "@/lib/predefined-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DecorativeHeading from "@/components/common/decorative-heading"
import H3 from "@/components/common/h3"

const PriceInfo = () => {
  const [prices, setPrices] = useState<Price[] | []>(predefinedPrices)
  const [otherPrice, setOtherPrice] = useState<Price>({
    name: "",
    value: 0,
    unit: "month",
    units: ["month"],
    type: "ORTHER",
  })
  const { id, nextStep, prevStep } = useCreateMotelStore()
  const updatePriceData = (type: PriceType, value: number) => {
    const nextPrice = [...prices]
    const index = nextPrice.findIndex((price) => price.type === type)

    if (index !== -1) {
      nextPrice[index] = { ...nextPrice[index], value: value }
      setPrices(nextPrice)
    }
  }

  const updateUnit = (type: PriceType, value: string) => {
    const nextPrice = [...prices]
    const index = nextPrice.findIndex((price) => price.type === type)

    if (index !== -1) {
      nextPrice[index] = { ...nextPrice[index], unit: value }
      setPrices(nextPrice)
    }
  }

  const { mutateAsync: createPrices } = useCreatePrice()
  const handleCreatePrices = () => {
    const postPrices: Omit<Price, "units">[] = prices.map((price) => ({
      name: price.name,
      type: price.type,
      unit: price.unit,
      value: price.value,
    }))
    if (id)
      createPrices({ motelId: id, data: postPrices })
        .then((data) => {
          console.log(data.data)
          nextStep()
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
  }

  return (
    <div className="">
      <div className="flex gap-10 items-stretch pb-20">
        <div className="flex-1 h-[500px] md:block hidden ">
          {/* <Skeleton className="size-full"></Skeleton> */}
          <Image
            src="/house-banner-1.jpg"
            alt=""
            width={400}
            height={600}
            className="size-full"
          />
        </div>
        <div className=" flex flex-col flex-1">
          <DecorativeHeading className="!text-2xl mb-5 text-main-blue-s3 mt-10">
            Các loại giá cả
          </DecorativeHeading>
          <div className=" mb-12 flex-1 flex flex-col gap-6">
            {prices.map((price) => (
              <div
                className="flex gap-3 items-center justify-between"
                key={price.name}
              >
                <Label className="w-[120px]">{price.name} </Label>
                <Input
                  type="number"
                  placeholder="(VND)"
                  className="flex-1"
                  value={price?.value || ""}
                  onChange={(e) =>
                    updatePriceData(price.type, Number(e.target.value))
                  }
                />

                <Select
                  defaultValue={price.unit}
                  onValueChange={(value) => updateUnit(price.type, value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {price.units.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {price.type === "ORTHER" && (
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="border-destructive text-destructive hover:text-destructive"
                    type="button"
                    onClick={() => {
                      let nextPrice = [...prices]
                      nextPrice = nextPrice.filter((p) => p.name !== price.name)
                      setPrices(nextPrice)
                    }}
                  >
                    <XIcon size={20}></XIcon>
                  </Button>
                )}
              </div>
            ))}

            <H3>Chi phí khác</H3>

            <div className="flex gap-3 items-center justify-between">
              <Input
                type="text"
                placeholder="Tên chi phí"
                className="w-[120px]"
                value={otherPrice?.name || ""}
                onChange={(e) =>
                  setOtherPrice({ ...otherPrice, name: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Giá (VND)"
                className="flex-1"
                value={otherPrice?.value || 0}
                onChange={(e) =>
                  setOtherPrice({
                    ...otherPrice,
                    value: Number(e.target.value),
                  })
                }
              />
              <Input
                type="text"
                placeholder="Đơn vị"
                className="w-[100px]"
                value={otherPrice.unit}
                onChange={(e) =>
                  setOtherPrice({ ...otherPrice, units: [e.target.value] })
                }
              />
              <Button
                size={"icon"}
                variant={"outline"}
                className="border-green-600 text-green-600"
                type="button"
                onClick={() => {
                  setPrices([...prices, otherPrice])
                }}
                disabled={Object.values(otherPrice).some((v) => !v)}
              >
                <PlusIcon size={20}></PlusIcon>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-end gap-2 fixed bottom-0 left-0 right-0 bg-background px-10 py-4 border-t ">
        <Button size={"lg"} variant={"secondary"} onClick={prevStep}>
          Quay lại
        </Button>
        <Button
          size={"lg"}
          onClick={handleCreatePrices}
          disabled={!prices.every((price) => price.value !== null)}
        >
          Tiếp tục
        </Button>
      </div>
    </div>
  )
}

export default PriceInfo
