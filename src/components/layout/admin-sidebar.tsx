"use client";
import { ReactNode, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  FileCheckIcon,
  FileImageIcon,
  HomeIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  UserRoundIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LogoutDialog } from "../common/logout-dialog";
import Image from "next/image";
import Link from "next/link";

type NavItem = { to: string; label: string; icon: ReactNode };
const entityNavData: NavItem[] = [
  {
    label: "Người dùng",
    to: "/admin/users",
    icon: <UserRoundIcon size={20} />,
  },
  {
    label: "Nhà trọ",
    to: "/admin/motels",
    icon: <HouseIcon size={20} />,
  },
  {
    label: "Bài đăng",
    to: "/admin/posts",
    icon: <FileImageIcon size={20} />,
  },
];
const statNavData: NavItem[] = [
  {
    label: "Người dùng",
    to: "/admin/users/stats",
    icon: <UserRoundIcon size={20} />,
  },
  {
    label: "Nhà trọ",
    to: "/admin/motels/stats",
    icon: <HouseIcon size={20} />,
  },
  {
    label: "Bài đăng",
    to: "/admin/posts/stats",
    icon: <FileImageIcon size={20} />,
  },
];

const AdminSidebar = () => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <div>
      <div className={`hidden md:block ${show ? "w-[240px]" : "w-[100px]"}`}>
        <div
          className={`h-screen flex flex-col p-6 transition-all duration-300 fixed top-0 ${
            show ? "w-[240px]" : "w-fit"
          }`}
        >
          <div
            className={` flex gap-3 items-center mb-16 mt-6 ${
              show ? "h-12" : "h-10"
            }`}
          >
            <Image
              src="/logo-no-text.png"
              alt="logo"
              className="pl-3"
              width={50}
              height={50}
            />
            {show && (
              <div className="font-semibold text-main-blue text-sm flex-1 mt-2">
                CAHouse <br /> Admin
              </div>
            )}
          </div>

          <div className=" flex flex-col gap-0.5">
            <SidebarItem to={"/admin/home"}>
              <HomeIcon size={20} /> {show && "Home"}
            </SidebarItem>

            <SidebarItem to={"/admin/approve"}>
              <FileCheckIcon size={20} /> {show && "Duyệt nhà trọ"}
            </SidebarItem>
          </div>

          <Separator className="mt-2"></Separator>

          <Label className=" mt-4 text-base mb-3 text-foreground">
            {show && "Quản lý thông tin"}
          </Label>
          <ul className="flex flex-col gap-0.5">
            {entityNavData.map((nav) => (
              <SidebarItem to={nav.to} key={nav.label}>
                {nav.icon} {show && nav.label}
              </SidebarItem>
            ))}
          </ul>
          <Separator className="mt-2"></Separator>

          <Label className=" mt-4 text-base mb-3  text-foreground">
            {show && "Báo cáo thống kê"}
          </Label>
          <ul className="flex flex-col gap-0.5">
            {statNavData.map((nav) => (
              <SidebarItem to={nav.to} key={`lgstat${nav.label}`}>
                {nav.icon} {show && nav.label}
              </SidebarItem>
            ))}
          </ul>

          <Separator className="mt-2"></Separator>
          <LogoutDialog>
            <div className="py-1.5 px-4 rounded-md font-medium flex gap-2 items-center mt-10 text-destructive cursor-pointer">
              <LogOutIcon size={20} /> {show && "Đăng suất"}
            </div>
          </LogoutDialog>

          <Button
            size={"icon"}
            variant={"outline"}
            className="mt-auto ml-auto"
            onClick={() => setShow(!show)}
          >
            {show && <ArrowLeftFromLineIcon></ArrowLeftFromLineIcon>}
            {!show && <ArrowRightFromLineIcon></ArrowRightFromLineIcon>}
          </Button>
        </div>
      </div>

      <div className="md:hidden pt-2 flex justify-between items-center container">
        <div className="flex gap-2 items-center">
          <img src="/logo-no-text.png" alt="logo" className="h-10" />
          <div className="font-semibold text-main-blue text-sm flex-1 mt-2">
            CAHouse <br /> Admin
          </div>
        </div>

        <Popover>
          <PopoverTrigger>
            <div className="bg-background flex items-center gap-1 rounded-md border py-2 px-4">
              <MenuIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit max-w-[200px] py-2 px-4">
            <div className=" flex flex-col gap-0.5">
              <SidebarItem to={"/admin/home"}>
                <HomeIcon size={20} /> Home
              </SidebarItem>

              <SidebarItem to={"/admin/approve"}>
                <FileCheckIcon size={20} /> Duyệt nhà trọ
              </SidebarItem>
            </div>

            <Separator className="my-2"></Separator>

            <Label className="pl-2 text-base text-foreground">
              Quản lý thông tin
            </Label>
            <ul className="flex flex-col gap-0.5 mt-2">
              {entityNavData.map((nav) => (
                <SidebarItem to={nav.to} key={`man${nav.label}`}>
                  {nav.icon} {nav.label}
                </SidebarItem>
              ))}
            </ul>
            <Separator className="my-2"></Separator>

            <Label className="pl-2 text-base text-foreground">
              Báo cáo thống kê
            </Label>
            <ul className="flex flex-col gap-0.5 mt-2">
              {statNavData.map((nav) => (
                <SidebarItem to={nav.to} key={`stat${nav.label}`}>
                  {nav.icon} {nav.label}
                </SidebarItem>
              ))}
            </ul>

            <Separator className="my-2"></Separator>
            <LogoutDialog>
              <div className="py-1.5 px-4 rounded-md font-medium flex gap-2 items-center text-destructive cursor-pointer">
                <LogOutIcon size={20} /> Đăng suất
              </div>
            </LogoutDialog>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const SidebarItem = ({ children, to }: { children: ReactNode; to: string }) => {
  return (
    <Link
      href={to}
      className="py-1.5 px-4 rounded-md font-medium flex gap-2 items-center"
      // className={({ isActive }) =>
      //   "py-1.5 px-4 rounded-md font-medium flex gap-2 items-center " +
      //   (!isActive
      //     ? "text-slate-600 hover:bg-main-blue-t8"
      //     : "shadow-md border bg-background text-main-blue-s3")
      // }
    >
      {children}
    </Link>
  );
};

export default AdminSidebar;
