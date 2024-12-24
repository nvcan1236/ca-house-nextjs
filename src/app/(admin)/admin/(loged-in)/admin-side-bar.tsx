"use client"

import React from "react"
import Image from "next/image"
import {
  FileCheckIcon,
  FileImageIcon,
  HomeIcon,
  HouseIcon,
  LogOutIcon,
  UserRoundIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { LogoutDialog } from "../../../../components/common/logout-dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../../../../components/ui/sidebar"
import SidebarItem, { NavItem } from "./side-bar-item"

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
]
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
]

const AdminSideBar = () => {
  const { open } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div
          className={cn(`flex  items-center mb-8 mt-6`, {
            "gap-3 pl-3": open,
          })}
        >
          <Image
            src="/logo-no-text.png"
            alt="logo"
            width={open ? 40 : 32}
            height={open ? 40 : 32}
          />
          {open && (
            <div className="font-semibold text-main-blue text-sm flex-1 mt-2">
              CAHouse <br /> Admin
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className=" flex flex-col">
            <SidebarItem
              open={open}
              item={{
                icon: <HomeIcon size={20} />,
                label: "Home",
                to: "/admin/home",
              }}
            />

            <SidebarItem
              open={open}
              item={{
                icon: <FileCheckIcon size={20} />,
                label: "Duyệt nhà trọ",
                to: "/admin/approve",
              }}
            />
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Quản lý thông tin</SidebarGroupLabel>

          <SidebarMenu>
            {entityNavData.map((nav) => (
              <SidebarMenuItem key={nav.label}>
                <SidebarMenuButton asChild>
                  <SidebarItem item={nav} open={open} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Báo cáo thống kê</SidebarGroupLabel>
          <SidebarMenu>
            {statNavData.map((nav) => (
              <SidebarMenuItem key={`lgstat${nav.label}`}>
                <SidebarMenuButton asChild>
                  <SidebarItem item={nav} open={open} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* <Separator className="mt-2"></Separator> */}

        {/* <Button size={"icon"} variant={"outline"} className="mt-auto ml-auto">
          {true ? <ArrowLeftFromLineIcon /> : <ArrowRightFromLineIcon />}
        </Button> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <LogoutDialog>
                <div
                  className={cn(
                    "py-1.5 px-1 rounded-md font-medium inline-flex items-center text-destructive",
                    {
                      "px-4 gap-2": open,
                    }
                  )}
                >
                  <LogOutIcon size={20} /> {open && "Đăng suất"}
                </div>
              </LogoutDialog>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AdminSideBar
