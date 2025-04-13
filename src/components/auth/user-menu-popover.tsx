import { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import {
  AlertCircle,
  BookmarkCheckIcon,
  CalendarClockIcon,
  HouseIcon,
  HousePlusIcon,
  LogOutIcon,
  MenuIcon,
  NotepadTextIcon,
  UserIcon,
} from "lucide-react"
import { toast } from "sonner"

import CreatePasswordForm from "../auth/create-password-form"
import { LogoutDialog } from "../common/logout-dialog"
import { Alert, AlertDescription } from "../ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Separator } from "../ui/separator"

const UserMenuPopover = () => {
  const { user } = useAuthStore()

  const handleCreateMotel = () => {
    if (!user || !user.id) {
      toast.warning("Vui lòng đăng nhập trước!!")
      return
    }
    redirect("/register-motel")
  }

  if (!user) return

  const menuItems: { href: string; label: string; icon?: ReactNode }[] = [
    {
      href: `/profile/${user.username}`,
      label: "Hồ sơ cá nhân",
      icon: <UserIcon size={20} />,
    },
    {
      href: "/appointment",
      label: "Lịch hẹn",
      icon: <CalendarClockIcon size={20} />,
    },
    {
      href: "/motels/saved",
      label: "Xem phòng đã lưu",
      icon: <BookmarkCheckIcon size={20} />,
    },
    {
      href: "/appointment",
      label: "Xem phòng đã đặt",
      icon: <HousePlusIcon size={20} />,
    },
    {
      href: "/posts/mine",
      label: "Quản lý bài viết",
      icon: <NotepadTextIcon size={20} />,
    },
  ]

  return (
    <div className="flex gap-2 items-center">
      <Popover>
        <PopoverTrigger>
          <div className="bg-background flex items-center gap-1 rounded-md border py-2 px-4">
            <MenuIcon />
            <span className="font-medium max-w-20 text-ellipsis text-nowrap ml-3 mr-1 text-sm">
              {user?.firstName}
            </span>
            <Avatar className="size-6">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[240px] p-2">
          <ul className="space-y-1 ">
            {user?.noPassword && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Alert
                      variant="destructive"
                      className="w-full py-2 text-main-yellow border-main-yellow cursor-pointer"
                    >
                      <AlertDescription className="text-sm flex gap-2 items-center">
                        <AlertCircle className="size-4" /> Tạo mật khẩu
                      </AlertDescription>
                    </Alert>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-main-blue text-xl">
                        Tạo mật khẩu
                      </DialogTitle>
                      <DialogDescription>
                        Tạo mật khẩu lần đầu vì bạn đã đăng nhập bằng Google. Từ
                        giờ bạn có thể đăng nhập với username là email và mật
                        khẩu này
                      </DialogDescription>
                    </DialogHeader>
                    <CreatePasswordForm />
                  </DialogContent>
                </Dialog>
                <li className="py-2">
                  <Separator />
                </li>
              </>
            )}

            <li className=" hover:bg-slate-100 transition-all block lg:hidden">
              <Button
                variant={"secondary"}
                className="w-full py-1 px-2 flex border-main-yellow text-main-yellow bg-main-yellow-t9 hover:bg-main-yellow-t6 transition-all hover:border-main-yellow hover:border-2"
                onClick={handleCreateMotel}
              >
                <HousePlusIcon size={20} className="mr-3"></HousePlusIcon> Đăng
                trọ
              </Button>
            </li>
            {menuItems.map((item) => (
              <li
                key={item.label}
                className="py-1 px-2 hover:bg-slate-100 transition-all"
              >
                <Link href={item.href} className="flex items-center gap-2 px-2">
                  {item.icon} {item.label}
                </Link>
              </li>
            ))}
            {user.roles.includes("OWNER") && (
              <li className="py-1 px-2 hover:bg-slate-100 transition-all">
                <Link href={"/motels/mine"} className="flex items-center gap-2 px-2">
                  <HouseIcon size={20} /> Quản lý trọ
                </Link>
              </li>
            )}
            <li className="py-1">
              <Separator />
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all t-destructive">
              <LogoutDialog>
                <div className="w-full text-left text-destructive flex items-center gap-2 cursor-pointer px-2">
                  <LogOutIcon className="size-4" /> Đăng xuất
                </div>
              </LogoutDialog>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserMenuPopover
