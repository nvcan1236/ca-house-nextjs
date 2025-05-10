import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ApiResponse, PageResult } from "@/types/common"
import {
  Amenity,
  Appointment,
  AppointmentStatus,
  IMotel,
  Location,
  Price,
  RegularCreate,
  Requirement,
  ReservationCreationResponse,
  ReservationResponse,
  ReviewRequest,
} from "@/types/motel"

import { authAxios, formDataAxios } from "./axios"

export const useCreateRegularMotel = () => {
  return useMutation({
    mutationFn: async (data: RegularCreate) => {
      const response = await authAxios.post<ApiResponse<IMotel>>(
        `/motel/`,
        data
      )
      return response.data
    },
  })
}

export const useUpdateRegularMotel = () => {
  return useMutation({
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: RegularCreate
    }) => {
      const response = await authAxios.put<ApiResponse<IMotel>>(
        `/motel/${motelId}`,
        data
      )
      return response.data
    },
  })
}

export const useGetReviews = (motelId: string) => {
  return useQuery({
    queryKey: ["reviews", motelId],
    queryFn: async () => {
      const response = await authAxios.get(`/motel/${motelId}/review`)
      return response.data
    },
  })
}
export const useBookAppointment = () => {
  return useMutation({
    mutationFn: async ({ motelId, date }: { motelId: string; date: Date }) => {
      const response = await authAxios.post(`/motel/${motelId}/appointment`, {
        date,
      })
      return response.data
    },
  })
}
export const useGetAppointmentsByUser = () => {
  return useQuery({
    queryKey: ["appointmentsByUser"],
    queryFn: async (): Promise<ApiResponse<Appointment[]>> => {
      const response = await authAxios.get(`/motel/appointment/user`)
      return response.data
    },
  })
}
export const useChangeAppointmentStatus = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      appointmentId,
      status,
    }: {
      appointmentId: string
      status: AppointmentStatus
    }) => {
      const response = await authAxios.put(
        `/motel/appointment/${appointmentId}/update-status?status=${status}`
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments", "owner"] })
    },
  })
}
export const useGetReservationsByUser = (page: number) => {
  return useQuery({
    queryKey: ["reservations", page],
    queryFn: async () => {
      const response = await authAxios.get<
        ApiResponse<PageResult<ReservationResponse>>
      >(`/motel/reserve/user?page=${page}`)
      return response.data
    },
  })
}

export const useGetReservationsByOwner = (page: number) => {
  return useQuery({
    queryKey: ["reservations", page],
    queryFn: async () => {
      const response = await authAxios.get<
        ApiResponse<PageResult<ReservationResponse>>
      >(`/motel/reserve/owner?page=${page}`)
      return response.data
    },
  })
}

export const useCreateLocationMotel = () => {
  return useMutation({
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: Location
    }) => {
      const response = await authAxios.post(`/motel/${motelId}/location`, data)
      return response.data
    },
  })
}

export const useCreateAmenity = () =>
  useMutation({
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: Amenity[]
    }) => {
      return (await authAxios.post(`/motel/${motelId}/amenity`, data)).data
    },
  })

export const useCreatePrice = () =>
  useMutation({
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: Omit<Price, "units">[]
    }) => {
      return (await authAxios.post(`/motel/${motelId}/price`, data)).data
    },
  })
export const useCreateRequirement = () =>
  useMutation({
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: Requirement
    }) => {
      return (await authAxios.post(`/motel/${motelId}/requirement`, data)).data
    },
  })
export const useUploadImages = () =>
  useMutation({
    mutationFn: async ({
      motelId,
      images,
    }: {
      motelId: string
      images: FileList
    }): Promise<ApiResponse<Appointment[]>> => {
      const formData = new FormData()
      Array.from(images).forEach((image) => formData.append("images", image))
      return (await formDataAxios.post(`/motel/${motelId}/images`, formData))
        .data
    },
  })
export const useCreateReview = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      motelId,
      data,
    }: {
      motelId: string
      data: ReviewRequest
    }) => {
      return (await authAxios.post(`/motel/${motelId}/review`, data)).data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
    },
  })
}
export const useGetAppointmentsByOwner = () => {
  return useQuery({
    queryKey: ["appointments", "owner"],
    queryFn: async (): Promise<ApiResponse<Appointment[]>> => {
      return (await authAxios.get("/motel/appointment/owner")).data
    },
    staleTime: 5000, // 5s trước khi fetch lại
  })
}
export const usePayDeposit = () =>
  useMutation({
    mutationFn: async ({
      motelId,
      amount,
      duarion,
    }: {
      motelId: string
      amount: number
      duarion: number
    }): Promise<ApiResponse<ReservationCreationResponse>> => {
      return (
        await authAxios.get(
          `/motel/reserve/${motelId}/payment/vn-pay?amount=${amount}&duration=${duarion}`
        )
      ).data
    },
  })
export const useUpdatePaymentStatus = () =>
  useMutation({
    mutationFn: async ({
      reservationId,
      status,
    }: {
      reservationId: string
      status: "PAYMENT_SUCCESS" | "PAYMENT_FAIL"
    }) => {
      return (
        await authAxios.put(
          `/motel/reserve/${reservationId}/status?status=${status}`
        )
      ).data
    },
  })
