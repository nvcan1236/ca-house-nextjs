import { ReactNode, useState } from "react"
import Image from "next/image"
import { useGetUserByIdQuery } from "@/services/userApi"

import { User } from "@/types/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Item from "@/components/common/item"

const UserDialog = ({
  children,
  user,
}: {
  children: ReactNode
  user: User
}) => {
  const [open, setOpen] = useState(false)
  const { data } = useGetUserByIdQuery(user.id)
  const detailUser = data?.result

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <div className="flex p-4 gap-10 ">
          <div className="w-1/3 absolute">
            <Label>Ảnh đại diện</Label>
            <Image
              src={detailUser?.avatar || ""}
              alt=""
              className="mt-2 size-full object-cover"
              width={1000}
              height={100}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <Label>Thông tin</Label>
            <Item>
              ID: <span>{detailUser?.id}</span>
            </Item>
            <Item>
              Họ: <span>{detailUser?.lastName}</span>
            </Item>
            <Item>
              Tên: <span>{detailUser?.firstName}</span>
            </Item>
            <Item>
              Username: <span>{detailUser?.username}</span>
            </Item>
            <Item>
              Email: <span>{detailUser?.email}</span>
            </Item>
            <Item>
              Vai trò: <span>{detailUser?.roles}</span>
            </Item>
          </div>
        </div>
      </DialogContent>

      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="avatar" className="text-right mt-2">
              Ảnh đại diện
            </Label>
            <Avatar className="h-40 w-32  rounded-sm border">
              <AvatarImage
                src={detailUser?.avatar}
                className="size-full object-cover "
              />
              <AvatarFallback className="size-full rounded-sm text-center text-sm text-gray-700">
                <div>Chưa upload avatar</div>
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="lastName" className="text-right mt-2">
              Họ
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={detailUser?.lastName}
              // onChange={handleInputChange}
              className="col-span-3 h-fit"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create_by" className="text-right">
              Tên
            </Label>
            <Input
              id="create_by"
              name="create_by"
              value={detailUser?.firstName}
              // onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="create_at" className="text-right">
              Username
            </Label>
            <Input
              id="create_at"
              name="create_at"
              value={detailUser?.username}
              // onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Email
            </Label>
            <Input
              id="type"
              name="type"
              value={detailUser?.email}
              // onChange={handleInputChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Email
            </Label>
            <Input
              id="type"
              name="type"
              value={detailUser?.roles.join(", ")}
              // onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserDialog
