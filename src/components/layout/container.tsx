import React, { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const Container = (props: ComponentProps<"div">) => {
  return (
    <div className={cn("container px-4 md:px-10", props.className)}>
      {props.children}
    </div>
  )
}

export default Container
