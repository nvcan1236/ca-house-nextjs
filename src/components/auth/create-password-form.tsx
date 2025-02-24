import { useCreatePasswordMutation } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { User } from "@/types/auth"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const CreatePasswordForm = () => {
  const loginValidationSchema = z
    .object({
      password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự."),
      rePassword: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự."),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Mật khẩu không trùng khớp",
      path: ["rePassword"],
    })
  const { user, setUserInfor } = useAuthStore()
  const { mutate: createPassword } = useCreatePasswordMutation()

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      password: "",
      rePassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    try {
      createPassword(values)
      if (user) {
        const nextDetailUser: User = { ...user, noPassword: true }
        setUserInfor(nextDetailUser)
      }
      toast.success("Đã tạo mật khẩu thành công")
    } catch {
      toast.error("Đã có lỗi xảy ra.")
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập lại mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="mt-4 self-end px-14">Tạo</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatePasswordForm
