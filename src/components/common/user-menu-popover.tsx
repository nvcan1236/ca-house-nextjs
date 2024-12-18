import { AlertCircle, HousePlusIcon, MenuIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import CreatePasswordForm from "../auth/create-password-form";
import { Separator } from "../ui/separator";
import { LogoutDialog } from "./logout-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { User } from "@/lib/types";
import Link from "next/link";

const UserMenuPopover = ({ user }: { user: User }) => {
  const handleCreateMotel = () => {
    if (!user || !user.id) {
      toast.warning("Vui lòng đăng nhập trước!!");
      return;
    }
    redirect("/register-motel");
  };
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
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit max-w-[200px] p-2">
          <ul>
            {user?.noPassword && (
              <>
                <li className=" hover:bg-yellow-50 transition-all mb-1"></li>
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
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link href={`./profile/${user.id}`}>Profile</Link>
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link href={"/saved-motel"}>Danh sách yêu thích</Link>
            </li>
            {user.roles.includes("OWNER") && (
              <li className="py-1 px-2 hover:bg-slate-100 transition-all">
                <Link href={"/my-motel"}>Quản lý trọ</Link>
              </li>
            )}
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link href={"/my-post"}>Quản lý bài viết</Link>
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link href={"/my-appointments"}>Danh sách đặt phòng</Link>
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all">
              <Link href={"/my-reservations"}>Danh sách cọc phòng</Link>
            </li>
            <li className="py-1">
              <Separator />
            </li>
            <li className="py-1 px-2 hover:bg-slate-100 transition-all t-destructive">
              <LogoutDialog>
                <div className="w-full text-left">Đăng xuất</div>
              </LogoutDialog>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserMenuPopover;
