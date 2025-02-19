import { useMutation, useQuery } from "@tanstack/react-query"

import { AppointmentStatus, Location, RegularCreate } from "@/types/motel"

import api from "./api"

export const useCreateRegularMotel = () => {
  return useMutation({
    mutationFn: async (data: RegularCreate) => {
      const response = await api.post(`/motel/`, data)
      return response.data
    },
  })
}
export const useUploadImagesMotel = () => {
  return useMutation({
    mutationFn: async ({
      motelId,
      images,
    }: {
      motelId: string
      images: File[]
    }) => {
      const formData = new FormData()
      Array.from(images).forEach((image) => formData.append("images", image))
      const response = await api.post(`/motel/${motelId}/images`, formData)
      return response.data
    },
  })
}

export const useGetReviews = (motelId: string) => {
  return useQuery({
    queryKey: ["reviews", motelId],
    queryFn: async () => {
      const response = await api.get(`/motel/${motelId}/review`)
      return response.data
    },
  })
}
export const useBookAppointment = () => {
  return useMutation({
    mutationFn: async ({ motelId, date }: { motelId: string; date: Date }) => {
      const response = await api.post(`/motel/${motelId}/appointment`, { date })
      return response.data
    },
  })
}
export const useGetAppointmentsByUser = () => {
  return useQuery({
    queryKey: ["appointmentsByUser"],
    queryFn: async () => {
      const response = await api.get(`/motel/appointment/user`)
      return response.data
    },
  })
}
export const useChangeAppointmentStatus = () => {
  return useMutation({
    mutationFn: async ({
      appointmentId,
      status,
    }: {
      appointmentId: string
      status: AppointmentStatus
    }) => {
      const response = await api.put(
        `/motel/appointment/${appointmentId}/update-status?status=${status}`
      )
      return response.data
    },
  })
}
export const useGetReservationsByUser = (page: number) => {
  return useQuery({
    queryKey: ["reservations", page],
    queryFn: async () => {
      const response = await api.get(`/motel/reserve/user?page=${page}`)
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
      const response = await api.post(`/motel/${motelId}/location`, data)
      return response.data
    },
  })
}
