"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"

const NavButtons = () => {
  const pathname = usePathname()
  const role = pathname.includes("motels") ? "motel" : "post"
  return (
    <div
      className={`flex gap-2 p-1.5 border border-gray-300 rounded-xl  bg-gray-50 `}
    >
      <Link href={"/motels"}>
        <Button
          className={cn("md:w-[120px]  w-20  ", {
            "text-gray-500": role === "post",
          })}
          size={"sm"}
          variant={role === "motel" ? "default" : "ghost"}
        >
          Trọ
        </Button>
      </Link>
      <Link href={"/posts"}>
        <Button
          className={cn("md:w-[120px] w-20 ", {
            "text-gray-500": role === "motel",
          })}
          size={"sm"}
          variant={role === "post" ? "default" : "ghost"}
        >
          Bài đăng
        </Button>
      </Link>
    </div>
  )
}

export default NavButtons
