import Image from "next/image"

import { ChatMessage } from "@/types/chat"

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
              <Image
                src={msg.mediaUrl || ""}
                alt="Chat image"
                width={160}
                height={240}
              />
            </DialogTrigger>
            <DialogContent className="lg:max-w-[1000px]">
              <Image
                src={msg.mediaUrl || ""}
                alt="Chat image"
                width={1000}
                height={600}
              />
            </DialogContent>
          </Dialog>
        </div>
        {/* <span className="text-[10px] text-slate-600 text-right">
          {formatCreatedAt(msg.createdAt)}
        </span> */}
      </>
    )

  return (
    <div>
      <div
        className={` mt-1  py-2 px-3 rounded-xl shadow-md w-fit text-sm max-w-[200px] ${
          mine
            ? "ml-auto bg-main-blue text-white rounded-br-none border-slate-400 border "
            : "text-main-blue border border-main-blue  bg-main-blue-t9 rounded-bl-none"
        }`}
      >
        {msg.content}
      </div>
      {/* <p className="text-[10px] text-slate-600 text-right">
        {formatCreatedAt(msg.createdAt)}
      </p> */}
    </div>
  )
}

export default Message
