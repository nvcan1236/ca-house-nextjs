import React, { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { usePayDeposit } from "@/services/motelUtilApi"
import { useAuthStore } from "@/stores/auth-store"

import { IMotelDetail } from "@/types/motel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DepositDialog: FC<{ detailMotel: IMotelDetail }> = ({ detailMotel }) => {
  const { mutateAsync: payDeposit } = usePayDeposit()
  const router = useRouter()
  const { user, openModal } = useAuthStore()
  const [dateNumber, setDateNumber] = useState(1)
  const amount = Math.floor((dateNumber * detailMotel.price) / 30)
  const handleDeposit = async () => {
    if (!user) {
      openModal()
      return
    }

    if (detailMotel?.id) {
      const { result } = await payDeposit({
        motelId: detailMotel.id,
        amount,
        duarion: dateNumber,
      })
      if (result.paymentUrl) router.push(result.paymentUrl)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">Đặt cọc</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cọc trọ</DialogTitle>
          <DialogDescription>
            Việc đặt cọc sẽ được thực hiện qua cổng thanh toán VNPAY
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="day" className="text-right">
              Chọn số ngày muốn đặt cọc
            </Label>
            <Input
              id="day"
              value={dateNumber}
              onChange={(e) => setDateNumber(Number(e.target.value))}
              type="number"
              min={1}
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-right">
              Số tiền cần thanh toán:{" "}
            </Label>
            <Input id="name" value={amount} readOnly />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleDeposit}>
            Thanh toán cọc
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DepositDialog
