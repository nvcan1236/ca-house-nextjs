import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { XIcon } from "lucide-react"

import { ChatMessage } from "@/types/chat"
import { getFullName } from "@/lib/utils"

import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import ChatActions from "./chat-actions"
import ChatUser from "./chat-user"
import Message from "./message"

const CurrentRoom = ({ messages }: { messages: ChatMessage[] }) => {
  const { currentRoom, setCurrentRoom } = useChatStore()
  const { user } = useAuthStore()

  if (!user || !currentRoom) return

  return (
    <div className="h-full flex rounded-sm flex-col bg-background border px-4 py-2 ">
      <div className="flex items-center justify-between">
        <ChatUser
          name={getFullName(currentRoom.members[0])}
          avatar={currentRoom.members[0].avatar}
        />
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setCurrentRoom(null)}
        >
          <XIcon />
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1 py-2 pr-4">
        {messages?.map((m) => (
          <Message
            key={m.id}
            msg={m}
            mine={m.sender == user.username}
          ></Message>
        ))}
      </ScrollArea>

      <ChatActions />
    </div>
  )
}

export default CurrentRoom
