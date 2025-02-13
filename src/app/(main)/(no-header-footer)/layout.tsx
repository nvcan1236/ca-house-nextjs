// import Chat from "@/components/common/Chat";
import React, { PropsWithChildren } from "react"
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster } from "sonner"

import HeaderNoSearch from "@/components/layout/header-no-search"
import Container from "@/components/layout/container"

const MainLayout = ({ children }: PropsWithChildren) => {
  // const role = useAppSelector((state) => state.common.role);
  return (
    <div
      className={` min-h-screen bg-gradient-to-b transition-all from-main-yellow-t9 to-main-blue-t8 `}
    >
      <HeaderNoSearch />
      <div className=" flex  items-center justify-center">
        <Container>{children}</Container>
      </div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        icons={{
          success: <CircleCheckIcon size={20} />,
          info: <InfoIcon size={20} />,
          warning: <TriangleAlertIcon size={20} />,
          error: <CircleXIcon size={20} />,
        }}
      />
      {/* <Chat /> */}
    </div>
  )
}

export default MainLayout
