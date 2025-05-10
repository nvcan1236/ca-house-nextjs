import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const ChatUser = ({ name, avatar }: { name: string; avatar: string }) => {
  return (
    <div className="flex gap-2">
      <Avatar className="size-8">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-main-blue text-white ">
          {name[0]?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <b className="text-sm mt-1 text-slate-600">{name}</b>
    </div>
  )
}

export default ChatUser
