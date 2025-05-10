import React, { useState } from "react"
import { useSaveMotel } from "@/services/motelApi"
import { useBookAppointment } from "@/services/motelUtilApi"
import { useAuthStore } from "@/stores/auth-store"
import { useQueryClient } from "@tanstack/react-query"
import {
  BookmarkIcon,
  CalendarIcon,
  FilePlus2Icon,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"

import { IMotelDetail } from "@/types/motel"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import PostCreateDialog from "@/components/post/post-create-dialog"

const DetailMotelAction = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const [date, setDate] = useState(new Date())
  const { mutateAsync: bookApointment, isPending: loadingBookAppointment } =
    useBookAppointment()
  const { user, openModal } = useAuthStore()
  const queryClient = useQueryClient()
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
      openModal()
      return
    }
    const { result: savedResult } = await saveMotel(detailMotel.id)
    queryClient.invalidateQueries({
      queryKey: ["motel", detailMotel.id],
    })
    if (savedResult.isSaved) {
      toast.success("Lưu trọ thành công!")
    } else {
      toast.success("Bỏ lưu trọ thành công!")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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

      <Button
        variant={"secondary"}
        className={cn("p-4 bg-background", {
          "bg-main-yellow-t6 border-main-yellow": detailMotel.saved,
        })}
        onClick={handleSaveMotel}
      >
        <BookmarkIcon
          size={16}
          className={cn("mr-2", {
            "fill-main-yellow text-main-yellow": detailMotel.saved,
          })}
        />
        {detailMotel.saved ? "Đã lưu" : "Lưu trọ"}
      </Button>

      <PostCreateDialog>
        <Button variant={"secondary"} className={cn("p-4 bg-background")}>
          <FilePlus2Icon size={16} className="mr-2" /> Tạo bài viết
        </Button>
      </PostCreateDialog>
    </div>
  )
}

export default DetailMotelAction
