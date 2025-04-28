import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const H3 = ({ className, children, ...props }: ComponentProps<"h3">) => {
  return (
    <h3
      {...props}
      className={cn("text-lg text-main-blue-s3 font-medium w-fit", className)}
    >
      {children}
    </h3>
  )
}

export default H3
