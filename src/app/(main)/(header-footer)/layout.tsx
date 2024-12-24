// import Chat from "@/components/common/Chat";
import React, { PropsWithChildren } from "react"
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"

const MainLayout = ({ children }: PropsWithChildren) => {
  // const role = useAppSelector((state) => state.common.role);
  return (
    <div
      className={`  bg-gradient-to-b transition-all from-main-yellow-t9 to-main-blue-t8 `}
    >
      <Header></Header>
      <div className="pt-[160px] pb-10">{children}</div>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            default: "border-2 border-main-blue",
            closeButton: "border border-inherit",
            
          },
        }}
        icons={{
          close: <XIcon size={20} />,
          success: <CircleCheckIcon size={20} />,
          info: <InfoIcon size={20} />,
          warning: <TriangleAlertIcon size={20} />,
          error: <CircleXIcon size={20} />,
        }}
      />
      {/* <Chat /> */}
      <Footer></Footer>
    </div>
  )
}

export default MainLayout
