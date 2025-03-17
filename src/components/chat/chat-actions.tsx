import React from "react"
import Image from "next/image"
import { useSendMessage } from "@/services/chatService"
import {
  ImageIcon,
  LoaderCircleIcon,
  SendHorizonalIcon,
  XIcon,
} from "lucide-react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

const ChatActions = () => {
  const { files, setFiles, content, setContent, handleSendMessage, uploading } =
    useSendMessage()

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles?.filter((file) => file.name !== fileName))
  }

  return (
    <div>
      {files && (
        <ScrollArea className="max-w-full ">
          <div className="flex gap-2 relative h-[80px] mb-4">
            {Array.from(files).map((file) => (
              <div key={file.name} className="relative flex-shrink-0">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Chat image"
                  width={160}
                  height={240}
                  className="h-full w-auto object-cover"
                />
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="absolute top-0 right-0 border border-main-blue w-6 h-6"
                  // xủa lý xoá ảnh khỏi files state
                  onClick={() => handleRemoveFile(file.name)}
                >
                  <XIcon size={12} />
                </Button>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Soạn tin nhắn..."
          value={content}
          className="border border-main-blue"
          onChange={(e) => setContent(e.target.value)}
        ></Input>
        <Button variant={"ghost"} size={"icon"}>
          <Label htmlFor="image-chat">
            <ImageIcon className="text-main-blue" />
          </Label>
        </Button>
        <Button variant={"ghost"} size={"icon"} onClick={handleSendMessage}>
          {uploading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <SendHorizonalIcon className="text-main-blue" />
          )}
        </Button>
        <Input
          id="image-chat"
          type="file"
          className="hidden size-px"
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files))
            }
          }}
          accept=".png, .jpeg, .jpg"
          multiple
        ></Input>
      </div>
    </div>
  )
}

export default ChatActions
