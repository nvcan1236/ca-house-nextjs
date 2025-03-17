import React from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import { HousePlusIcon, MenuIcon } from "lucide-react"
import { toast } from "sonner"

import LoginButton from "../common/login-button"
import { Button } from "../ui/button"
import UserMenuPopover from "../auth/user-menu-popover"

const HeaderAction = () => {
  const { user } = useAuthStore()
  const router = useRouter()
  const handleCreateMotel = () => {
    if (!user || !user.id) {
      toast.warning("Vui lòng đăng nhập trước!!")
      return
    }
    router.push("/motels/register")
  }
  return (
    <>
      <div className="hidden md:flex gap-2 justify-end flex-wrap">
        <Button
          variant={"secondary"}
          onClick={handleCreateMotel}
          className="flex border-main-yellow text-main-yellow hover:bg-main-yellow-t6 transition-all hover:border-main-yellow hover:border-2 border-2"
        >
          <HousePlusIcon size={20} className="mr-3"></HousePlusIcon> Đăng trọ
        </Button>

        <div className="flex gap-3 item-center">
          <div className="hidden md:block">
            {user ? <UserMenuPopover /> : <LoginButton />}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <Button size={"icon"} variant={"outline"}>
          <MenuIcon />
        </Button>
      </div>
    </>
  )
}

export default HeaderAction
