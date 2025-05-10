"use client"

import { usePathname } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { MessageCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import LoginButton from "../common/login-button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import CurrentRoom from "./current-room"
import Rooms from "./rooms"
import SelectUser from "./select-user"

const ChatSheet = () => {
  const { chatOpen, toggleChat, currentRoom } = useChatStore()
  const pathName = usePathname()
  const { user } = useAuthStore()

  if (pathName === "/motels/register") return

  return (
    <div>
      <Sheet open={chatOpen} onOpenChange={toggleChat} modal={false}>
        <SheetTrigger asChild>
          <div className="bg-main-yellow text-white rounded-lg px-4 py-2 fixed bottom-4 right-10 flex gap-2 items-center z-20">
            <MessageCircleIcon /> <span className="hidden sm:inline">Chat</span>
          </div>
        </SheetTrigger>

        <SheetContent
          className={cn({
            "min-w-full md:min-w-[800px]": currentRoom,
            "min-w-full md:min-w-[400px]": !currentRoom,
          })}
        >
          <SheetHeader>
            <SheetTitle>Tin nhắn</SheetTitle>
          </SheetHeader>

          {!user ? (
            <div className="text-center">
              <div className="py-10 ">Đăng nhập để nhắn tin</div>
              <LoginButton />
            </div>
          ) : (
            <div className="flex gap-2 pt-6 h-full">
              <div className="flex-1 transition-all overflow-hidden">
                <SelectUser />
                <Rooms />
              </div>
              <div
                className={cn("h-full", {
                  "md:w-2/3 w-full": currentRoom,
                  "w-0": !currentRoom,
                })}
              >
                <CurrentRoom />
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default ChatSheet
