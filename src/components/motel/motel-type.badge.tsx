import React from "react"

import { MotelType } from "@/types/motel"
import { cn } from "@/lib/utils"

import { Badge, BadgeProps } from "../ui/badge"

type Size = "sm" | "md"

const MotelTypeBadge = ({
  size = "md",
  ...props
}: BadgeProps & { type: MotelType; size?: Size }) => {
  const typeTransfer: { [key in MotelType]: string } = {
    APARTMENT: "Căn hộ, chung cư",
    DORMITORY: "Ký trúc xá",
    SINGLE_ROOM: "Phòng trọ đơn",
    WHOLE_HOUSE: "Nhà nguyên căn",
  }

  const classNameSize: { [key in Size]: string } = {
    md: "px-4 py-1 bg-main-yellow-t6 hover:bg-main-yellow-t6 text-main-blue-s3 text-sm",
    sm: "text-xs bg-main-yellow-t6 text-main-blue hover:bg-main-yellow-t6",
  }
  return (
    <Badge className={cn(classNameSize[size], "font-semibold", props.className)}>
      {typeTransfer[props.type].toUpperCase()}
    </Badge>
  )
}

export default MotelTypeBadge
