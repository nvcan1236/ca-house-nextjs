import { useChatRooms } from "@/services/chatService"
import { useChatStore } from "@/stores/chat-store"

import { RoomChat } from "@/types/chat"
import { getFullName } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Rooms = () => {
  const { setCurrentRoom } = useChatStore()
  const { data: roomsData } = useChatRooms()
  const rooms = roomsData?.result

  const partner = (room: RoomChat) => room.members[0]

  return (
    <ul className="flex flex-col gap-4 mt-4">
      {rooms?.map((room) => (
        <li
          className="flex gap-2 text-xs"
          key={room.id}
          onClick={() => {
            setCurrentRoom(room)
          }}
        >
          <Avatar className="size-8">
            <AvatarImage src={partner(room).avatar} />
            <AvatarFallback className="bg-main-blue text-white ">
              {partner(room).username[0]?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <b className="line-clamp-1">{getFullName(partner(room))}</b>
            <p className="line-clamp-1 text-ellipsis">
              {room.lastMessage &&
                (room.lastMessage.messageType === "IMAGE"
                  ? "Hình ảnh"
                  : room.lastMessage.content)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Rooms
