"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useChatRooms, useGetMessages } from "@/services/chatService"
import webSocketService from "@/services/webSocketService"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { MessageCircleIcon } from "lucide-react"

import { ChatMessage, TEMP_CHAT_ID } from "@/types/chat"
import { cn } from "@/lib/utils"

import { Input } from "../ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import CurrentRoom from "./current-room"
import Rooms from "./rooms"

const ChatSheet = () => {
  const { chatOpen, toggleChat, currentRoom, setCurrentRoom } = useChatStore()
  const { refetch: refetchRooms } = useChatRooms()
  const pathName = usePathname()
  const { user } = useAuthStore()
  const { refetch: refetchMessages, data } = useGetMessages(
    currentRoom?.id || ""
  )
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    const changeRoom = async () => {
      const { data } = await refetchMessages()
      setMessages(data?.result || [])
    }

    changeRoom()

    if (data?.result) setMessages(data.result)
    if (!currentRoom || !user?.username) return

    webSocketService.connect(
      currentRoom.id,
      user?.username,
      (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage])
        if (currentRoom.id === TEMP_CHAT_ID)
          setCurrentRoom({
            ...currentRoom,
            id: newMessage.roomId,
          })
      },
      () => {
        refetchRooms()
      }
    )

    return () => webSocketService.disconnect()
  }, [currentRoom, user])

  if (pathName === "/motels/register") return

  return (
    <div>
      <Sheet open={chatOpen} onOpenChange={toggleChat}>
        <SheetTrigger>
          <div className="bg-main-yellow text-white rounded-lg px-4 py-2 fixed bottom-4 right-10 flex gap-2 items-center z-20">
            <MessageCircleIcon /> <span className="hidden sm:inline">Chat</span>
          </div>
        </SheetTrigger>

        <SheetContent className="min-w-full md:min-w-[800px]">
          <SheetHeader>
            <SheetTitle>Tin nhắn</SheetTitle>
          </SheetHeader>

          {!user ? (
            <div className="text-center py-10 ">Đăng nhập để nhắn tin</div>
          ) : (
            <div className="flex gap-2 pt-6 h-full">
              <div className="flex-1 transition-all overflow-hidden">
                <Input placeholder="Tìm kiếm..."></Input>
                <Rooms />
              </div>
              <div
                className={cn("h-full", {
                  "md:w-2/3 w-full": currentRoom,
                  "w-0": !currentRoom,
                })}
              >
                <CurrentRoom messages={messages} />
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default ChatSheet
