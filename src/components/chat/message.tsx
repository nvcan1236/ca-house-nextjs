import Image from "next/image"

import { ChatMessage } from "@/types/chat"
import { cn, formatDateTime } from "@/lib/utils"

import CustomTooltip from "../common/tooltip"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

type MessageProps = {
  msg: ChatMessage
  mine?: boolean
}

const Message = ({ msg, mine }: MessageProps) => {
  if (msg.messageType == "IMAGE")
    return (
      <>
        <div
          className={`mt-1 rounded-xl shadow-md w-fit max-w-[200px] ${
            mine ? "ml-auto  rounded-br-none " : "rounded-bl-none"
          }`}
        >
          <Dialog>
            <DialogTrigger>
              <CustomTooltip label={formatDateTime(msg.createdAt || "")}>
                <Image
                  src={msg.mediaUrl || ""}
                  alt="Chat image"
                  width={160}
                  height={240}
                />
              </CustomTooltip>
            </DialogTrigger>
            <DialogContent className="lg:max-w-[1000px]">
              <Image
                src={msg.mediaUrl || ""}
                alt="Chat image"
                width={1000}
                height={600}
                className="object-cover h-[600px]"
              />
            </DialogContent>
          </Dialog>
        </div>
      </>
    )

  return (
    <div className={cn("max-w-[200px] w-fit ", { "ml-auto ": mine })}>
      <CustomTooltip label={formatDateTime(msg.createdAt || "")}>
        <div
          className={` mt-1 py-2 px-3 rounded-xl shadow-sm text-sm ${
            mine
              ? "rounded-br-none bg-background text-main-blue-s2 text-right"
              : "rounded-bl-none bg-main-blue-t9 text-main-blue-s2 border border-main-blue-s2   "
          }`}
        >
          {msg.content}
        </div>
      </CustomTooltip>
    </div>
  )
}

export default Message
