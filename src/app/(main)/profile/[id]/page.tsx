"use client"

import React, { ChangeEvent, useState } from "react"
import { useParams } from "next/navigation"
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/services/userApi"
import { EditIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProfileTab from "@/components/auth/profile-tab"
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
    <div>
      <div className="from-main-blue-t9 from-30% to-main-yellow-t6 shadow bg-gradient-to-br h-[80px] md:h-[180px] w-full rounded-lg mx-auto"></div>

      <div className="flex flex-col md:flex-row gap-2 mt-2 relative">
        <div className="md:sticky top-0 w-full md:w-1/2 lg:w-1/3 border rounded-md  gap-2 py-3 px-6 bg-slate-50">
          {/* AVATAR */}
          <div className=" mt-5 flex flex-col">
            <div className="-mt-[100px] flex items-center flex-col hover  ">
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
              <span className="mt-2 font-semibold">
                {detailUser?.firstName} {detailUser?.lastName}
              </span>
              <span className="text-gray-600 text-sm">
                @{detailUser?.username}
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 py-3 mt-6">
            <div className="flex justify-between items-baseline">
              <h3>Tài khoản</h3>
              <Button
                variant={"ghost"}
                size={"sm"}
                type="button"
                className="text-main-blue"
                onClick={() => setEditting({ ...editting, account: true })}
              >
                <EditIcon size={16} />
              </Button>
            </div>
            <form>
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Id</Label>{" "}
                  <Input value={detailUser?.id} disabled />
                </div>
                <div className="flex gap-3 items-center">
                  <Label className="w-32">Username</Label>{" "}
                  <Input value={detailUser?.username} disabled />
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
                <div className="flex justify-end gap-4">
                  {editting.account && (
                    <>
                      <Button
                        type="button"
                        size={"sm"}
                        onClick={() =>
                          setEditting({ ...editting, account: false })
                        }
                        variant={"outline"}
                      >
                        Huỷ
                      </Button>
                      <Button size={"sm"} className="px-6">
                        Lưu
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>

            <div className="flex justify-between items-baseline mt-4">
              <h3>Thông tin khác</h3>
              <Button
                variant={"ghost"}
                size={"sm"}
                type="button"
                className="text-main-blue"
                onClick={() => setEditting({ ...editting, profile: true })}
              >
                <EditIcon size={16} />
              </Button>
            </div>
            <form>
              <div className="flex flex-col  ">
                <div className="flex flex-col gap-y-2">
                  <div className="flex gap-3 items-center">
                    <Label className="w-32">Ngày sinh</Label>{" "}
                    <Input
                      value={
                        detailUser?.profile?.dob &&
                        formatDate(detailUser?.profile?.dob || "")
                      }
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
                  {/* <div className="flex gap-3 items-center">
                    <Label className="w-32">Link messenger</Label>{" "}
                    <Input
                      value={detailUser?.profile?.messenger}
                      placeholder="m.me/username"
                      readOnly={!editting.profile}
                    />
                  </div> */}
                  <div className="flex gap-3 items-center">
                    <Label className="w-32">Nghề nghiệp</Label>{" "}
                    <Input
                      value={detailUser?.profile?.occupation}
                      placeholder="Học sinh, sinh viên, công nhân, ..."
                      readOnly={!editting.profile}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    {editting.profile && (
                      <>
                        <Button
                          type="button"
                          size={"sm"}
                          onClick={() =>
                            setEditting({ ...editting, profile: false })
                          }
                          variant={"outline"}
                        >
                          Huỷ
                        </Button>
                        <Button size={"sm"} className="self-end px-6">
                          Lưu
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <Button variant={"destructive"} className="mt-4">
              Xoá tài khoản
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <ProfileTab userId={id.toString()} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
