import { useEffect } from "react"
import { useUpdateAccountMutation } from "@/services/userApi"
import { useForm } from "react-hook-form"

import { DetailUser } from "@/types/auth"
import { Button } from "@/components/ui/button"

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"

type EditProfileProps = {
  detailUser?: DetailUser
  editting: {
    account: boolean
    profile: boolean
  }
  setEditting: (editting: { account: boolean; profile: boolean }) => void
}

export default function EditProfile({
  detailUser,
  editting,
  setEditting,
}: EditProfileProps) {
  const form = useForm()
  const { mutate: updateAccount } = useUpdateAccountMutation()

  useEffect(() => {
    if (detailUser) {
      form.setValue("id", detailUser.id)
      form.setValue("username", detailUser.username)
      form.setValue("lastName", detailUser.lastName)
      form.setValue("firstName", detailUser.firstName)
      form.setValue("email", detailUser.email)
    }
  }, [detailUser, form])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    updateAccount({
      id: detailUser?.id ?? "",
      data: {
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
      },
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="id"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center">
              <FormLabel className="w-32">Id</FormLabel>{" "}
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="username"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center">
              <FormLabel className="w-32">Username</FormLabel>{" "}
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center">
              <FormLabel className="w-32">Họ</FormLabel>{" "}
              <FormControl>
                <Input {...field} disabled={!editting.account} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="firstName"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center">
              <FormLabel className="w-32">Tên</FormLabel>{" "}
              <FormControl>
                <Input {...field} disabled={!editting.account} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center">
              <FormLabel className="w-32">Email</FormLabel>{" "}
              <FormControl>
                <Input {...field} disabled={!editting.account} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormItem className="flex justify-end gap-4">
          {editting.account && (
            <>
              <Button
                type="button"
                size={"sm"}
                onClick={() => setEditting({ ...editting, account: false })}
                variant={"outline"}
              >
                Huỷ
              </Button>
              <Button size={"sm"} className="px-6">
                Lưu
              </Button>
            </>
          )}
        </FormItem>
      </form>
    </Form>
  )
}
