import axios, { authAxios, formDataAxios } from "@/services/axios"
import { getToken, removeToken, setToken } from "@/services/localStorageService"
import { useAuthStore } from "@/stores/auth-store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import {
  CreatePasswordData,
  DetailUser,
  LoginForm,
  Profile,
  User,
  UserStat,
} from "@/types/auth"
import { CreateMessage } from "@/types/chat"
import { ApiResponse, TokenData } from "@/types/common"

// outbound
export const useOutbound = () => {
  return useMutation<
    ApiResponse<TokenData>,
    AxiosError<{ code: number }>,
    string
  >({
    mutationKey: ["outbound"],
    mutationFn: async (code: string) => {
      const { data } = await axios.post(
        `/identity/auth/outbound/authentication?code=${encodeURIComponent(code)}`
      )
      return data
    },
  })
}

// 📌 Lấy danh sách tất cả người dùng
export const useGetAllUserQuery = () =>
  useQuery<ApiResponse<User[]>>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await authAxios.get("/identity/users")
      return data
    },
  })

// 📌 Lấy thông tin người dùng hiện tại
export const useGetCurrentUserQuery = (enabled?: boolean) =>
  useQuery<ApiResponse<User>>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await authAxios.get("/identity/users/my-infor")
      return data
    },
    enabled,
  })

// 📌 Lấy thông tin người dùng theo ID
export const useGetUserByIdQuery = (userId: string) =>
  useQuery<ApiResponse<DetailUser>>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await authAxios.get(`/identity/users/${userId}`)
      return data
    },
  })

// 📌 Đăng nhập
export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<TokenData>,
    AxiosError<{ code: number }>,
    LoginForm
  >({
    mutationFn: async (data) => {
      const response = await axios.post("/identity/auth/token", data)
      return response.data
    },
    onSuccess: (data) => {
      setToken(data.result.token)
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      }, 300)
    },
    onError: (error) => {
      if (error?.response?.data?.code === 2001) {
        toast.error(`Thông tin đăng nhập không chính xác!!! Vui lòng thử lại. `)
      } else if (error?.response?.data.code === 1004) {
        toast.error("Username không chính xác!!! Vui lòng thử lại.")
      }
    },
  })
}

// 📌 Đăng xuất
export const useLogoutMutation = () => {
  const { setUserInfor } = useAuthStore()
  const token = getToken()
  return useMutation<ApiResponse<null>, AxiosError>({
    mutationFn: async () => {
      const { data } = await axios.post("/identity/auth/logout", { token })
      return data
    },
    onSuccess: () => {
      removeToken()
      setUserInfor()
    },
  })
}

// 📌 Cập nhật avatar người dùng
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<string>, Error, FormData>({
    mutationFn: async (data) => {
      const response = await formDataAxios.post(
        "/identity/users/upload-avatar",
        data
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

// 📌 Tạo mật khẩu
export const useCreatePasswordMutation = () =>
  useMutation<ApiResponse<string>, Error, CreatePasswordData>({
    mutationFn: async (data) => {
      const response = await authAxios.post(
        "/identity/auth/create-password",
        data
      )
      return response.data
    },
  })

// check username
export const useCheckUsername = () =>
  useMutation<ApiResponse<boolean>, Error, string>({
    mutationKey: ["checkUsername"],
    mutationFn: async (username: string) => {
      const response = await axios.post(`identity/users/check/${username}`)
      return response.data
    },
  })

// 📌 Lấy thống kê người dùng
export const useGetUserStatQuery = ({
  startDate,
  endDate,
  period = "MONTH",
}: {
  startDate: string
  endDate: string
  period?: "MONTH" | "YEAR" | "QUARTER"
}) =>
  useQuery<ApiResponse<UserStat>>({
    queryKey: ["userStat", startDate, endDate, period],
    queryFn: async () => {
      const { data } = await authAxios.get(
        `/identity/users/stat?startDate=${startDate}&endDate=${endDate}&period=${period}`
      )
      return data
    },
  })

// 📌 Cập nhật hồ sơ người dùng
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<DetailUser>, Error, Profile>({
    mutationFn: async (profile) => {
      const response = await authAxios.put("/identity/profile", profile)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

// 📌 Theo dõi người dùng
export const useFollow = () => {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<null>, Error, string>({
    mutationFn: async (userId) => {
      const response = await authAxios.post(`/identity/users/${userId}/follow`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

// 📌 Gửi tin nhắn
export const useSendMessageMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<unknown>, Error, CreateMessage>({
    mutationFn: async (message) => {
      const formData = new FormData()
      Array.from(message.images || []).forEach((image) => {
        formData.append("images", image)
      })

      const response = await formDataAxios.post(
        `/identity/chat/?content=${message.content}&type=${message.type}&recipient=${message.recipient}`,
        formData
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}
