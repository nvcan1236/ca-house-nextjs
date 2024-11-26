import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { useAppDispatch } from "@/stores/hooks";
import {
  closeAuthModal,
  setUserInfor,
  switchFormType,
} from "@/stores/slices/authSlice";
import { getToken, setToken } from "@/services/localStorageService";
import { caHouseEndpoint } from "@/configs/api-config";
import googleConfig from "@/configs/google-login-config";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useLoginMutation } from "@/stores/api/userApi";
import { toast } from "sonner";
import axios from "axios";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const loginValidationSchema = z.object({
    username: z.string().min(4),
    password: z.string().min(4),
  });

  const form = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginWithGoogle = () => {
    const callbackUri = googleConfig.redirect_uris;
    const client_id = googleConfig.client_id;
    const authUrli = googleConfig.auth_uri;

    const targetUrl = `${authUrli}?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      callbackUri
    )}&response_type=code&scope=openid%20email%20profile&`;

    window.location.href = targetUrl;
  };

  useEffect(() => {
    const authCodeRegex = /code=([^&]+)/;
    const isMatch = window.location.href.match(authCodeRegex);

    if (isMatch) {
      const authCode = isMatch[1];
      console.log(authCode);

      fetch(`${caHouseEndpoint.outbound}?code=${authCode}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setToken(data.result.token);
          axios
            .get(caHouseEndpoint.getMyInfor, {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            })
            .then((data) => {
              dispatch(setUserInfor(data.data.result));
            });
        });
    }
  }, []);

  const [login] = useLoginMutation();
  async function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    try {
      const data = await login(values).unwrap();

      if (data?.result?.token) {
        setToken(data.result.token);
        form.reset();
        dispatch(closeAuthModal());
      }
    } catch (error) {
      if (error?.data?.code === 2001) {
        toast.error("Thông tin đăng nhập không chính xác!!! Vui lòng thử lại.");
      } else if (error?.data?.code === 1004) {
        toast.error("Username không chính xác!!! Vui lòng thử lại.");
      } else {
        toast.error("Đã xảy ra lỗi, vui lòng thử lại sau.");
      }
    }
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
            Chỉ dùng email cho tài khoản đăng nhập với Google và đã tạo mật khẩu
            lẩn đầu. Đối với tài khoản chưa tạo mật khẩu lần đầu vùi long chọn
            phương thức đăng nhập bằng Google.
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
            <img
              src="/google-icon.png"
              alt="Google Icon"
              className="size-5 mr-4"
            />{" "}
            Đăng nhập bằng Google
          </Button>
          <p>
            Chưa có tài khoản ?{" "}
            <Button
              className="text-main-blue"
              variant={"link"}
              type="button"
              onClick={() => dispatch(switchFormType())}
            >
              Đăng ký
            </Button>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
