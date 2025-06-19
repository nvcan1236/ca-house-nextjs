import Link from "next/link"
import { useChatRooms } from "@/services/chatService"
// import { getRoomByWithUser } from "@/services/chatService"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { MailIcon, MessageCircle, PhoneCallIcon } from "lucide-react"

import { TEMP_CHAT_ID } from "@/types/chat"
import { IMotelDetail } from "@/types/motel"

import DecorativeHeading from "../../common/decorative-heading"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"

const DetailMotelOwner = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const { user, openModal } = useAuthStore()
  const { openChat, setCurrentRoom } = useChatStore()
  const { data } = useChatRooms()
  const updateCurrentRoom = async () => {
    if (!user) {
      openModal()
      return
    }

    if (detailMotel) {
      const rooms = data?.result
      const roomWithOwner = rooms?.filter(
        (room) => room.members[0].username === detailMotel.owner.username
      )

      if (roomWithOwner?.length) {
        setCurrentRoom(roomWithOwner[0])
      } else {
        setCurrentRoom({
          members: [detailMotel.owner, user],
          id: TEMP_CHAT_ID,
          createdAt: "",
        })
      }
      // const room = await getRoomByWithUser(detailMotel.ownerId, user.username)
      openChat()
    }
  }
  return (
    <div>
      <DecorativeHeading>Thông tin chủ trọ</DecorativeHeading>
      <div className="py-6 px-8 border rounded-xl mt-4 bg-background border-main-yellow-t6 shadow">
        <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row gap-y-6">
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

          <div className="text-right ">
            <p className="text-sm text-gray-700">
              Chủ động nhắn tin với chủ trọ để có nhiều thông tin hơn
            </p>
            <div className="flex gap-x-2 text-sm flex-wrap justify-end mt-4">
              <Link href={"tel:0344407003"}>
                <Button
                  variant={"secondary"}
                >
                  <PhoneCallIcon size={18} className="mr-2"></PhoneCallIcon>
                  Gọi điện
                </Button>
              </Link>
              <Button
                variant={"secondary"}
                onClick={updateCurrentRoom}
              >
                <MessageCircle size={18} className="mr-2"></MessageCircle>
                Nhắn tin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelOwner
