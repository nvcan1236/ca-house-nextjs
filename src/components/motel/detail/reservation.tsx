import React, { useState } from "react"
import { useBookAppointment } from "@/services/motelUtilApi"
import { CalendarIcon, HeartIcon } from "lucide-react"

import { IMotelDetail } from "@/types/motel"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DetailMotelReservation = ({
  detailMotel,
}: {
  detailMotel: IMotelDetail
}) => {
  const [date, setDate] = useState(new Date())
  const { mutateAsync: bookApointment } = useBookAppointment()
  const handleReservation = () => {
    if (detailMotel?.id) {
      bookApointment({
        motelId: detailMotel.id,
        date,
      }).then(({ data }) => {
        if (data?.result.paymentUrl) location.href = data?.result.paymentUrl
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="p-4 ">
            <CalendarIcon size={16} className="mr-2" /> Hẹn ngày xem phòng
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => setDate(date || new Date())}
            className="rounded-md border"
          />
          <Button
            className="block mt-3 ml-auto px-10"
            onClick={handleReservation}
          >
            Đặt
          </Button>
        </PopoverContent>
      </Popover>

      <Button variant={"secondary"} className="p-4">
        <HeartIcon size={16} className="mr-2" /> Thêm vào danh sách yêu thích
      </Button>
    </div>
  )
}

export default DetailMotelReservation
