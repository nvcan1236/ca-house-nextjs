"use client"

import React, { ChangeEvent, useState } from "react"
import { useParams } from "next/navigation"
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/services/userApi"
import { EditIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PageNotFound from "@/app/not-founed"

const ProfilePage = () => {
  const { id } = useParams()
  const [editting, setEditting] = useState({ account: false, profile: false })
  const [chosenImage, setChosenImage] = useState<File | null>(null)
  const { data } = useGetUserByIdQuery(id.toString())
  const { mutate: uploadAvatar } = useUpdateUserMutation()
  if (data && data.code == 1004)
    return <PageNotFound message="Không tìm thấy hồ sơ"></PageNotFound>

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    setChosenImage(event.target.files?.item(0) || null)
  }

  const detailUser = data?.result

  const handleUploadImage = async () => {
    const data: FormData = new FormData()
    data.append("images", chosenImage as Blob)
    uploadAvatar(data)
  }

  return (
    <div className="container mb-20 xl:w-[1200px]">
      <div className=" mt-5 flex flex-col items-center">
        <div className="from-main-blue-t8 from-30% to-main-yellow-t6 bg-gradient-to-br h-[180px] w-full rounded-lg mx-auto"></div>
        <div className="-mt-[60px] flex items-center flex-col hover  ">
          <div className="group relative overflow-hidden">
            <Avatar className="md:size-36 size-32 border avatar-hover:bg-black">
              <AvatarImage
                src={
                  (chosenImage && URL.createObjectURL(chosenImage)) ||
                  detailUser?.avatar
                }
                className="object-cover"
                alt="@shadcn"
              />
              <AvatarFallback className="md:text-5xl text-3xl">
                {detailUser?.firstName?.substring(0, 1).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-end top-0 left-0 absolute opacity-0 bg-black group-hover:bg-opacity-55 group-hover:opacity-100 w-full rounded-full h-full transition-all ">
              <Input
                accept=".png,.jpeg, .jpg"
                type="file"
                className="invisible size-0"
                id="avatar"
                onChange={handleChangeImage}
              ></Input>
              <Label
                className="text-white mb-10 cursor-pointer"
                htmlFor="avatar"
              >
                Change avatar
              </Label>
            </div>
          </div>
          {chosenImage && (
            <div>
              <Button
                className="mt-2"
                variant={"outline"}
                size={"sm"}
                onClick={handleUploadImage}
              >
                Cập nhật
              </Button>
              <Button
                className="mt-2 ml-3"
                variant={"destructive"}
                size={"sm"}
                onClick={() => setChosenImage(null)}
              >
                Huỷ
              </Button>
            </div>
          )}
          <span className="mt-4 font-semibold">
            {detailUser?.firstName} {detailUser?.lastName}
          </span>
          <span className="text-gray-600 text-sm">@{detailUser?.id}</span>
        </div>
      </div>

      <div className="p-4 lg:p-10 rounded-lg bg-main-blue-t8 mt-10">
        <form>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row">
              <span className="md:w-1/4 font-semibold text-gray-700  md:px-10 py-4 flex justify-between items-baseline">
                Tài khoản{" "}
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  type="button"
                  className="text-main-blue"
                  onClick={() => setEditting({ ...editting, account: true })}
                >
                  Sửa <EditIcon className="ml-2"></EditIcon>
                </Button>
              </span>
              <div className="border rounded-md flex-1 flex flex-col gap-2 py-3 px-6 bg-slate-50">
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Id</Label>{" "}
                  <Input value={detailUser?.id} readOnly />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Username</Label>{" "}
                  <Input value={detailUser?.username} readOnly />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Họ</Label>{" "}
                  <Input
                    value={detailUser?.lastName}
                    readOnly={!editting.account}
                    name="lastName"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Tên</Label>{" "}
                  <Input
                    value={detailUser?.firstName}
                    readOnly={!editting.account}
                    name="firstName"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Email</Label>{" "}
                  <Input
                    value={detailUser?.email}
                    readOnly={!editting.account}
                    name="email"
                  />
                </div>
                {editting.account && (
                  <Button className="self-end px-10">Lưu</Button>
                )}
              </div>
            </div>
          </div>
        </form>

        <form>
          <div className="flex flex-col mt-10 ">
            <div className="flex flex-col md:flex-row">
              <span className="md:w-1/4 font-semibold text-gray-700 md:px-10 py-4 flex justify-between items-baseline">
                Hồ sơ{" "}
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  type="button"
                  className="text-main-blue"
                  onClick={() => setEditting({ ...editting, profile: true })}
                >
                  Sửa <EditIcon className="ml-2"></EditIcon>
                </Button>
              </span>
              <div className=" border rounded-md flex-1 flex flex-col gap-2 py-3 px-6 bg-slate-50">
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Ngày sinh</Label>{" "}
                  <Input
                    value={detailUser?.profile?.dob}
                    placeholder="dd-mm-yyyy"
                    readOnly={!editting.profile}
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Điện thoại</Label>{" "}
                  <Input
                    value={detailUser?.profile?.phone}
                    placeholder="xxxx-xxx-xxx"
                    readOnly={!editting.profile}
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Link messenger</Label>{" "}
                  <Input
                    value={detailUser?.profile?.messenger}
                    placeholder="m.me/username"
                    readOnly={!editting.profile}
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Nghề nghiệp</Label>{" "}
                  <Input
                    value={detailUser?.profile?.occupation}
                    placeholder="Học sinh, sinh viên, công nhân, ..."
                    readOnly={!editting.profile}
                  />
                </div>
                {editting.profile && (
                  <Button className="self-end px-10">Lưu</Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage
