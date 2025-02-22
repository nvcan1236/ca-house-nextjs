import React from "react"
import { useRouter } from "next/navigation"
import { usePayDeposit } from "@/services/motelUtilApi"

import { IMotelDetail } from "@/types/motel"

import DecorativeHeading from "../../common/decorative-heading"
import Item from "../../common/item"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { Separator } from "../../ui/separator"

const DetailMotelPrice = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const { mutateAsync: payDeposit } = usePayDeposit()
  const router = useRouter()

  const handleFetchReservation = async () => {
    if (detailMotel?.id) {
      const { result } = await payDeposit({
        motelId: detailMotel.id,
        amount: Math.floor(detailMotel.price / 30),
      })
      console.log("🚀 ~ handleFetchReservation ~ data:", result)
      if (result.paymentUrl) router.push(result.paymentUrl)
    }
  }
  return (
    <div className="border border-main-yellow-t6 p-4 rounded-xl bg-background sticky top-[120px]">
      <DecorativeHeading>Giá cả</DecorativeHeading>
      <div className="flex flex-col gap-3 mt-4">
        <Item>
          <Label>Giá thuê: </Label>
          <p className="text-sm text-slate-700">
            <span className="text-lg text-main-blue font-medium">
              {Number(detailMotel?.price).toLocaleString()}đ{" "}
            </span>
            / tháng
          </p>
        </Item>
        {detailMotel?.prices.map((price) => (
          <Item key={price.type}>
            <Label>{price.name}: </Label>
            <p className="text-sm text-slate-700">
              <span className="text-base text-foreground">
                {Number(price.value).toLocaleString("vi")}đ
              </span>
              / {price.unit}
            </p>
          </Item>
        ))}
      </div>
      <Separator className="mt-4 mb-2"></Separator>
      <p className="text-slate-600 text-xs">
        Nếu bạn muốn giữ phòng này đến khi thuê ban có thể đặt cọc phòng này.
        Sau khi đặt cọc phòng sẽ bị ẩn với các người khác. Tiền đặt cọc mỗi ngày
        sẽ bằng giá thuê chia 30.
      </p>
      <Button className="mt-4 w-full" onClick={handleFetchReservation}>
        Đặt cọc
      </Button>
    </div>
  )
}

export default DetailMotelPrice
