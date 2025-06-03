import React, { useEffect } from "react"
import { useUpdateProfile } from "@/services/userApi"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { DetailUser } from "@/types/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

type EditProfileProps = {
  detailUser?: DetailUser
  editting: {
    account: boolean
    profile: boolean
  }
  setEditting: (editting: { account: boolean; profile: boolean }) => void
}

const EditOtherProfile = ({
  detailUser,
  editting,
  setEditting,
}: EditProfileProps) => {
  const form = useForm()
  const { mutate: updateProfile } = useUpdateProfile()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    updateProfile(data, {
      onSuccess: () => {
        toast.success("Cập nhật thành công")
      },
    })
    setEditting({ ...editting, profile: false })
  }

  useEffect(() => {
    if (detailUser) {
      form.setValue("dob", detailUser.profile?.dob || "")
      form.setValue("phone", detailUser.profile?.phone || "")
      form.setValue("messenger", detailUser.profile?.messenger || "")
      form.setValue("occupation", detailUser.profile?.occupation || "")
    }
  }, [detailUser, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col  ">
          <div className="flex flex-col gap-y-2">
            <FormField
              name="dob"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="w-32">Ngày sinh</FormLabel>{" "}
                  <FormControl>
                    <Input
                      disabled={!editting.profile}
                      type="date"
                      readOnly={!editting.profile}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="w-32">Điện thoại</FormLabel>{" "}
                  <FormControl>
                    <Input
                      disabled={!editting.profile}
                      readOnly={!editting.profile}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="occupation"
              render={({ field }) => (
                <FormItem className="flex gap-3 items-center">
                  <FormLabel className="w-32">Nghề nghiệp</FormLabel>{" "}
                  <FormControl>
                    <Select
                      disabled={!editting.profile}
                      name={field.name}
                      onValueChange={field.onChange}
                      defaultValue={field.value || "OTHER"}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="STUDENT">Học sinh</SelectItem>
                        <SelectItem value="WORKER">Công nhân</SelectItem>
                        <SelectItem value="OFFICER">
                          Nhân viên văn phòng
                        </SelectItem>
                        <SelectItem value="FREELANCER">Freelancer</SelectItem>
                        <SelectItem value="OTHER">Công việc khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              {editting.profile && (
                <>
                  <Button
                    type="button"
                    size={"sm"}
                    onClick={() => setEditting({ ...editting, profile: false })}
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
    </Form>
  )
}

export default EditOtherProfile
