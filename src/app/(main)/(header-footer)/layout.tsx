// import Chat from "@/components/common/Chat";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";

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
        icons={{
          success: <CircleCheckIcon size={20} />,
          info: <InfoIcon size={20} />,
          warning: <TriangleAlertIcon size={20} />,
          error: <CircleXIcon size={20} />,
        }}
      />
      {/* <Chat /> */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
