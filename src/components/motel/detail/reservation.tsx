import React, { useState } from "react"
import { useSaveMotel } from "@/services/motelApi"
import { useBookAppointment } from "@/services/motelUtilApi"
import { useAuthStore } from "@/stores/auth-store"
import { BookmarkIcon, CalendarIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"

import { IMotelDetail } from "@/types/motel"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DetailMotelAction = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const [date, setDate] = useState(new Date())
  const { mutateAsync: bookApointment, isPending: loadingBookAppointment } =
    useBookAppointment()
  const { user, openModal } = useAuthStore()
  const { mutateAsync: saveMotel } = useSaveMotel()
  const handleBookAppointment = () => {
    if (detailMotel?.id) {
      bookApointment({
        motelId: detailMotel.id,
        date,
      }).then(() => {
        toast.success("Đặt lịch xem phòng thành công!")
      })
    }
  }
  const handleSaveMotel = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập trước")
      openModal()
      return
    }
    await saveMotel(detailMotel.id)
    toast.success("Lưu trọ thành công!")
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
            onClick={handleBookAppointment}
          >
            {loadingBookAppointment ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Đặt"
            )}
          </Button>
        </PopoverContent>
      </Popover>

      <Button variant={"secondary"} className="p-4" onClick={handleSaveMotel}>
        <BookmarkIcon size={16} className="mr-2" /> Lưu trọ
      </Button>
    </div>
  )
}

export default DetailMotelAction
