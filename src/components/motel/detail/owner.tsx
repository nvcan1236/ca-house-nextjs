import React from "react"
import Link from "next/link"
import { MessageCircle } from "lucide-react"

import { IMotelDetail } from "@/types/motel"

import DecorativeHeading from "../../common/decorative-heading"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"

const DetailMotelOwner = ({ detailMotel }: { detailMotel: IMotelDetail }) => {
  const updateCurrentRoom = async () => {
    // if (!user) {
    //   dispatch(openAuthModal())
    // } else if (detailMotel) {
    //   const room = await getRoomByWithUser(detailMotel.ownerId, user.username)

    //   dispatch(openChat())
    //   dispatch(setCurrentRoom(room))
    // }
  }
  return (
    <div className="">
      <DecorativeHeading>Thông tin chủ trọ</DecorativeHeading>
      <div className="py-6 px-8 border rounded-xl  mt-4 flex gap-4 bg-background border-main-yellow-t6">
        <Avatar className="size-20 border">
          <AvatarImage src={detailMotel.owner.avatar}></AvatarImage>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/profile/${detailMotel?.ownerId}`} className="p-0">
            {`${detailMotel?.owner.firstName} ${detailMotel?.owner.lastName}`}
          </Link>
          <p>{detailMotel.owner.email}</p>

          <Button className="mt-4 flex" onClick={updateCurrentRoom}>
            <MessageCircle size={20} className="mr-2"></MessageCircle>
            Nhắn tin cho chủ nhà
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DetailMotelOwner
