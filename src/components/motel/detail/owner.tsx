import Link from "next/link"
import { getRoomByWithUser } from "@/services/chatService"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { MailIcon, MessageCircle } from "lucide-react"

import { IMotelDetail } from "@/types/motel"

import DecorativeHeading from "../../common/decorative-heading"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"

const DetailMotelOwner = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const { user, openModal } = useAuthStore()
  const { openChat, setCurrentRoom } = useChatStore()
  const updateCurrentRoom = async () => {
    if (!user) {
      openModal()
    } else if (detailMotel) {
      const room = await getRoomByWithUser(detailMotel.ownerId, user.username)
      openChat()
      setCurrentRoom(room)
    }
  }
  return (
    <div className="">
      <DecorativeHeading>Thông tin chủ trọ</DecorativeHeading>
      <div className="py-6 px-8 border rounded-xl mt-4 bg-background border-main-yellow-t6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 flex-1">
            <Avatar className="size-20 border">
              <AvatarImage src={detailMotel.owner.avatar}></AvatarImage>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div>
              <Link
                href={`/profile/${detailMotel?.ownerId}`}
                className="p-0 font-semibold underline"
              >
                {`${detailMotel?.owner.firstName} ${detailMotel?.owner.lastName}`}
              </Link>
              <p className="flex gap-1 items-center mt-2">
                <MailIcon size={20} />
                {detailMotel.owner.email}
              </p>
            </div>
          </div>

          <div className="text-right w-[200px]">
            <p className="text-sm text-gray-700">
              Chủ động nhắn tin với chủ trọ để có nhiều thông tin hơn
            </p>
            <Button className="mt-4" onClick={updateCurrentRoom}>
              <MessageCircle size={20} className="mr-2"></MessageCircle>
              Nhắn tin cho chủ trọ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelOwner
