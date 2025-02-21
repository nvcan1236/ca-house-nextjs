import React, { ReactNode } from "react"

import { cn } from "@/lib/utils"

type AmenityItemProps = {
  isActive: boolean
  icon: ReactNode
  onClick: () => void
  label: string
  className?: string
}

const AmenityItem = ({
  onClick,
  isActive,
  label,
  icon,
  className,
}: AmenityItemProps) => {
  return (
    <div
      className={cn(
        "rounded-lg px-6 py-4 text-center bg-background border-2 border-transparent text-gray-500 select-none",
        className,
        {
          "border-main-blue-s3  bg-main-blue-t9 text-main-blue-s5": isActive,
        }
      )}
      onClick={onClick}
    >
      <div className="w-fit mx-auto my-2">{icon}</div>
      <span>{label}</span>
    </div>
  )
}

export default AmenityItem
