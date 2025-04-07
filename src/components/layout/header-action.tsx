import React from "react"
import { useAuthStore } from "@/stores/auth-store"

import UserMenuPopover from "../auth/user-menu-popover"
import { CreateMotelButton } from "../common/create-motel-button"
import LoginButton from "../common/login-button"

const HeaderAction = () => {
  const { user } = useAuthStore()
  return (
    <>
      <div className="hidden md:flex gap-2 justify-end flex-wrap">
        <CreateMotelButton />
        <div className="flex gap-3 item-center">
          <div className="hidden md:block">
            {user ? <UserMenuPopover /> : <LoginButton />}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {user ? <UserMenuPopover /> : <LoginButton />}
      </div>
    </>
  )
}

export default HeaderAction
