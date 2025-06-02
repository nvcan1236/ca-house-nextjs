import { FilterState } from "@/stores/filter-store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ApiResponse, PageResult } from "@/types/common"
import { IMotel, IMotelDetail, MotelStat, Review } from "@/types/motel"

import api, { authAxios } from "./axios"
import axios from "./axios"
import { toast } from "sonner"

/** Fetch danh sách motels */
export const useGetMotels = ({
  page,
  size,
  filter,
  isAdmin = false,
}: {
  page?: number
  size?: number
  filter: FilterState
  isAdmin?: boolean
}) => {
  return useQuery({
    queryKey: ["motels", page, size, filter.applied, isAdmin],
    queryFn: async () => {
      const params = new URLSearchParams()
      const filterParam = new URLSearchParams()

      if (page) params.append("page", page.toString())
      if (size) params.append("size", size.toString())

      if (filter.applied) {
        if (filter.minPrice)
          filterParam.append("minPrice", filter.minPrice.toString())
        if (filter.maxPrice)
          filterParam.append("maxPrice", filter.maxPrice.toString())
        if (filter.roomType) filterParam.append("roomType", filter.roomType)
        if (filter.amenities.length)
          filterParam.append("amenities", filter.amenities.join(","))
      }

      const axios = isAdmin ? authAxios : api
      const response = await axios.get<ApiResponse<PageResult<IMotel>>>(
        `/motel/?${params.toString()}&${filterParam.size > 0 ? filterParam.toString() : ""}`
      )
      return response.data
    },
  })
}

/** Fetch thống kê motels */
export const useGetMotelStat = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ["motelStat", startDate, endDate],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<MotelStat>>(
        `/motel/stat?startDate=${startDate}&endDate=${endDate}&period=MONTH`
      )
      return response.data
    },
  })
}

/** Fetch chi tiết một motel */
export const useGetMotel = (id: string, isAdmin?: boolean) => {
  const axios = isAdmin ? authAxios : api
  return useQuery({
    queryKey: ["motel", id],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<IMotelDetail>>(
        `/motel/${id}`
      )
      return response.data
    },
  })
}

export const useSearchMotel = (keyword: string) => {
  return useQuery({
    queryKey: ["motels", "search", keyword],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<IMotelDetail[]>>(
        `/motel/search?keyword=${keyword}`
      )
      return response.data
    },
  })
}

export const useDeleteMotel = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (motelId: string) => {
      const res = await axios.delete(`/motel/${motelId}`)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motelsByUser"] })
      toast.success("Xoá trọ thành công!")
    },
  })
}

/** Fetch danh sách motels của một người dùng */
export const useGetMotelByUser = (userId: string) => {
  return useQuery({
    queryKey: ["motelsByUser", userId],
    queryFn: async () => {
      const response = await authAxios.get<ApiResponse<IMotel[]>>(
        `/motel/owner/${userId}`
      )
      return response.data
    },
  })
}

/** Fetch các motel gần vị trí */
export const useGetNearestMotels = ({
  lon,
  lat,
  radius,
}: {
  lon: number
  lat: number
  radius: number
}) => {
  return useQuery({
    queryKey: ["nearestMotels", lon, lat, radius],
    queryFn: async () => {
      const params = new URLSearchParams()
      params.append("lon", lon.toString())
      params.append("lat", lat.toString())
      params.append("radius", radius.toString())

      const response = await api.get<ApiResponse<IMotel[]>>(
        `/motel/nearest?${params.toString()}`
      )
      return response.data
    },
  })
}

/** Mutation: Duyệt motel */
export const useApproveMotel = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (motelId: string) => {
      const response = await authAxios.put<ApiResponse<null>>(
        `/motel/${motelId}/approve`
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motels"] }) // Làm mới danh sách motels sau khi duyệt
    },
  })
}

// Fetch get saved motels
export const useGetSavedMotel = () => {
  return useQuery({
    queryKey: ["saved motel"],
    queryFn: async () => {
      const response =
        await authAxios.get<ApiResponse<IMotel[]>>("/motel/saved")
      return response.data
    },
  })
}

// save motel
export const useSaveMotel = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (motelId: string) => {
      const response = await authAxios.post<ApiResponse<{ isSaved: boolean }>>(
        `motel/save/${motelId}`
      )
      queryClient.invalidateQueries({
        queryKey: ["saved motel"],
      })
      return response.data
    },
  })
}

export const useGetReviews = (motelId: string) => {
  return useQuery({
    queryKey: ["getReviews"],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<Review[]>>(
        `/motel/${motelId}/review`
      )
      return response.data
    },
  })
}

export const usePostReview = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["post-review"],
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: Pick<Review, "content">
    }) => {
      const res = await authAxios.post<ApiResponse<Review>>(
        `/motel/${motelId}/review`,
        data
      )
      queryClient.invalidateQueries({ queryKey: ["getReviews"] })
      return res
    },
  })
}

export const useGetAiReview = (motelId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["aiReview", motelId],
    queryFn: async () => {
      const response = await axios.get<ApiResponse<{
        reason: string
        status: "PENDING" | "APPROVED" | "REJECTED"
      }>>(
        `/motel/${motelId}/ai-review`
      )
      return response.data 
    },
    enabled: !!motelId && enabled,
  })
}
