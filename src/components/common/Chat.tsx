"use client"

import { useEffect, useState } from "react"
import { getMessagesInRoom, getRoomByUser } from "@/services/chatService"
import { useSendMessageMutation } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { ImageIcon, MessageCircleIcon, SendHorizonalIcon } from "lucide-react"

import { ChatMessage, ChatRoom } from "@/types/chat"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import Message from "./message"
import Rooms from "./room"

const Chat = () => {
  const { user, openModal } = useAuthStore()
  const [rooms, setRooms] = useState<ChatRoom[] | null>(null)
  const { currentRoom, chatOpen, setCurrentRoom, toggleChat, closeChat } =
    useChatStore()
  const [messages, setMessages] = useState<ChatMessage[] | null>(null)
  const { mutate: sendMessage } = useSendMessageMutation()
  const [images, setImages] = useState<FileList | []>([])
  const [content, setContent] = useState("")
  const send = () => {
    const partner = currentRoom?.member.filter(
      (member) => member != user?.username
    )[0]
    sendMessage({
      recipient: partner || "",
      type: images && images?.length > 0 ? "IMAGE" : "TEXT",
      content: content,
      images: images || [],
    })
    setImages([])
    setContent("")
  }

  useEffect(() => {
    const unsubcribe = getRoomByUser(user?.username || "", (newRooms) => {
      setRooms(newRooms)
      setCurrentRoom(newRooms[0])
    })

    return () => {
      unsubcribe()
    }
  }, [user?.username])

  useEffect(() => {
    const unsubscribe = getMessagesInRoom(
      currentRoom?.id || "",
      (newMessages) => {
        setMessages(newMessages)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [currentRoom?.id])

  return (
    <div className="fixed bottom-2 right-4 ">
      <Popover open={chatOpen} onOpenChange={toggleChat}>
        <PopoverTrigger>
          <div className="bg-main-yellow text-white rounded-xl w[60px] px-4 py-2">
            <MessageCircleIcon />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="bg-main-blue-t9 p-2 rounded-md border w-[540px]"
        >
          {user ? (
            <div className=" flex gap-2 ">
              <div className="w-[32px] hover:w-[160px] transition-all overflow-hidden ">
                <Input placeholder="Tìm kiếm..."></Input>
                <Label className="pl-2 block mt-3 line-clamp-1">
                  Lịch sử chat
                </Label>
                <ul className="flex flex-col gap-4 mt-4">
                  <Rooms rooms={rooms || []} />
                </ul>
              </div>
              <div className="flex-1 flex rounded-sm flex-col bg-background border px-4 py-2">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <Avatar className="size-8">
                      <AvatarImage />
                      <AvatarFallback className="bg-main-blue text-white ">
                        C
                      </AvatarFallback>
                    </Avatar>
                    <b className="text-sm mt-1 text-slate-600">
                      {
                        currentRoom?.member.filter(
                          (member) => member != user.username
                        )[0]
                      }
                    </b>
                  </div>
                  <Separator />
                  <ScrollArea className="h-[400px] py-2 pr-4">
                    {messages?.map((m) => (
                      <Message
                        key={m.id}
                        chat={m}
                        mine={m.createdBy == user.username}
                      ></Message>
                    ))}
                  </ScrollArea>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Nhắn tin"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></Input>
                  <Input
                    id="image-chat"
                    type="file"
                    className="invisible size-px"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement // Ép kiểu e.target thành HTMLInputElement
                      if (target.files) {
                        setImages(target.files)
                      }
                    }}
                    accept=".png, .jpeg, .jpg"
                    multiple
                  ></Input>
                  <Button variant={"ghost"} size={"icon"}>
                    <Label htmlFor="image-chat">
                      <ImageIcon className="text-main-blue" />
                    </Label>
                  </Button>

                  <Button variant={"ghost"} size={"icon"} onClick={send}>
                    <SendHorizonalIcon className="text-main-blue" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[400px] flex justify-center items-center">
              <div className="text-right">
                <p>Đăng nhập để bắt đầu chat</p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeChat()
                    openModal()
                  }}
                  className="mt-3"
                >
                  Đăng nhập
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Chat
