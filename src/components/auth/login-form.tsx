import { useEffect, useState } from "react"
import Image from "next/image"
import { caHouseEndpoint } from "@/configs/api-config"
import { getToken, setToken } from "@/services/localStorageService"
import { useLoginMutation } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { loginWithGoogle } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"

const authCodeRegex = /code=([^&]+)/

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { setUserInfor, closeModal } = useAuthStore()
  const { switchAuthType } = useAuthStore()
  const loginValidationSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(4),
  })

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  useEffect(() => {
    const isMatch = window.location.href.match(authCodeRegex)

    if (isMatch) {
      const authCode = isMatch[1]

      fetch(`${caHouseEndpoint.outbound}?code=${authCode}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setToken(data.result.token)
          axios
            .get(caHouseEndpoint.getMyInfor, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((data) => {
              setUserInfor(data.data.result)
            })
        })
    }
  }, [])

  const { mutateAsync: login } = useLoginMutation()
  async function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    login(values)
      .then(() => {
        form.reset()
        closeModal()
      })
      .catch((error) => {
        if (error?.data?.code === 2001) {
          toast.error(
            "Thông tin đăng nhập không chính xác!!! Vui lòng thử lại."
          )
        } else if (error?.data?.code === 1004) {
          toast.error("Username không chính xác!!! Vui lòng thử lại.")
        } else {
          toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.")
        }
      })
  }

  return (
    <div>
      <Form {...form}>
        <h3 className="text-slate-500 font-semibold text-2xl text-center ">
          Đăng nhập
        </h3>
        <Separator className="mt-3 mb-5 bg-main-yellow" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 flex flex-col"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username/ Email</FormLabel>

                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      className="pr-10"
                      {...field}
                    />
                    <span
                      className="absolute right-3 top-1/2 p-1 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeIcon size={20} />
                      ) : (
                        <EyeOffIcon size={20} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormDescription className="text-xs mt-2">
            Chỉ nhập email cho tài khoản đã đăng nhập bằng Google và đã tạo mật
            khẩu lẩn đầu. Đối với tài khoản không đăng ký với Google vui lòng sử
            dụng username.
          </FormDescription>

          <Button type="submit" className="mt-6 w-full">
            Đăng nhập
          </Button>
          <Button
            type="button"
            className="mt-2 w-full"
            variant={"outline"}
            onClick={loginWithGoogle}
          >
            <Image
              src="/google-icon.png"
              alt="Google Icon"
              className="mr-4"
              width={20}
              height={20}
            />{" "}
            Đăng nhập bằng Google
          </Button>
          <p>
            Chưa có tài khoản ?{" "}
            <Button
              className="text-main-blue"
              variant={"link"}
              type="button"
              onClick={switchAuthType}
            >
              Đăng ký
            </Button>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
