import React, { PropsWithChildren } from "react"
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react"

import { Toaster } from "@/components/ui/sonner"
import ChatSheet from "@/components/chat/chat-sheet"
import Container from "@/components/layout/container"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`bg-gradient-to-b transition-all to-main-yellow-t9 from-main-blue-t8 `}
    >
      <Header />
      <Container className="pb-10">{children}</Container>
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
      <Footer></Footer>
      <ChatSheet />
    </div>
  )
}

export default MainLayout
