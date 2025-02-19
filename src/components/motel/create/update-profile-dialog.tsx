"use client"

import { FC, ReactNode, useState } from "react"
import { useUpdateProfileMutation } from "@/services/userApi"

import { Profile } from "@/types/auth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePickerNoForm from "@/components/common/date-picker-no-form"
import SelectBox from "@/components/common/select-box"

const jobOptions = [
  {
    label: "Học sinh, sinh viên",
    value: "STUDENT",
  },
  {
    label: "Công nhân",
    value: "WORKER",
  },
  {
    label: "Nhân viên văn phòng",
    value: "OFFICER",
  },
  {
    label: "Công việc tự do",
    value: "FREELANCER",
  },
  {
    label: "Khác",
    value: "OTHER",
  },
]

const UpdateProfileDialog: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const { mutate: updateProfileMutation } = useUpdateProfileMutation()
  const [open, setOpen] = useState(false)

  const [profile, setProfile] = useState<Profile>({
    dob: "",
    messenger: "",
    occupation: "OTHER",
    phone: "",
  })
  const updateProfile = (type: keyof Profile, value: unknown) => {
    const nextProfile = {
      ...profile,
      [type]: value,
    }
    setProfile(nextProfile)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="lg:min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Cập nhật Profile</DialogTitle>
            <DialogDescription>
              Để có thể đăng ký trọ bạn cần cập nhật hồ sơ người dùng
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-right">
                Số điện thoại
              </Label>
              <Input
                id="name"
                name="name"
                className="col-span-3"
                value={profile.phone}
                onChange={(e) => updateProfile("phone", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-right">
                Ngày sinh
              </Label>
              <DatePickerNoForm
                value={profile.dob ? new Date(profile.dob) : undefined}
                className="col-span-3"
                onChange={(value) => {
                  console.log("🚀 ~ value:", value)
                  updateProfile("dob", value)
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="name" className="text-right">
                Nghề nghiệp
              </Label>
              <div className="col-span-3">
                <SelectBox
                  options={jobOptions}
                  onSelectChange={(value) => updateProfile("occupation", value)}
                ></SelectBox>
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="mess" className="text-right">
                Link Messenger
              </Label>
              <Input
                id="link-mess"
                name="mess"
                className="col-span-3"
                value={profile.messenger}
                onChange={(e) => updateProfile("messenger", e.target.value)}
              />
            </div>
            <div className="text-right">
              <Button
                onClick={() => {
                  updateProfileMutation(profile)
                }}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
