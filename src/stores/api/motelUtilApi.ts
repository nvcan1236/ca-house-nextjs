import { IMotel, RegularCreate } from "@/utils/interfaces";
import { appointmentStatus } from "@/utils/predefinedData";
import {
  Amenity,
  ApiResponse,
  Appointment,
  Location,
  PageResult,
  Price,
  Requirement,
  ReservationCreationResponse,
  ReservationResponse,
  Review,
  ReviewRequest,
} from "@/utils/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryReauth";

export const motelUtilApi = createApi({
  reducerPath: "motelUtilApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["REVIEWS", "APPOINTMENT_STATUS"],
  endpoints: (builder) => ({
    createRegularMotel: builder.mutation<ApiResponse<IMotel>, RegularCreate>({
      query: (data) => {
        return {
          url: `/motel/`,
          body: data,
          method: "POST",
        };
      },
    }),
    createLocationMotel: builder.mutation<
      ApiResponse<IMotel>,
      { motelId: string; data: Location }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/location`,
          body: data,
          method: "POST",
        };
      },
    }),
    createAmenityMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; data: Amenity[] }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/amenity`,
          body: data,
          method: "POST",
        };
      },
    }),
    uploadImageyMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; images: FileList }
    >({
      query: ({ motelId, images }) => {
        const formData = new FormData();
        Array.from(images).forEach((image) => formData.append("images", image));
        return {
          url: `/motel/${motelId}/images`,
          body: formData,
          method: "POST",
        };
      },
    }),
    createPriceMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; data: Omit<Price, "units">[] }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/price`,
          body: data,
          method: "POST",
        };
      },
    }),
    createRequirementMotel: builder.mutation<
      ApiResponse<unknown>,
      { motelId: string; data: Requirement }
    >({
      query: ({ motelId, data }) => {
        return {
          url: `/motel/${motelId}/requirement`,
          body: data,
          method: "POST",
        };
      },
    }),
    createReview: builder.mutation<
      ApiResponse<Review>,
      { data: ReviewRequest; motelId: string }
    >({
      query: ({ data, motelId }) => {
        return {
          url: `/motel/${motelId}/review`,
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["REVIEWS"],
    }),
    getReview: builder.query<ApiResponse<Review[]>, string>({
      query: (motelId) => ({
        url: `/motel/${motelId}/review`,
      }),
      providesTags: ["REVIEWS"],
    }),
    bookAppointment: builder.mutation<
      ApiResponse<unknown[]>,
      { motelId: string; date: string }
    >({
      query: ({ motelId, date }) => ({
        url: `/motel/${motelId}/appointment`,
        body: { date },
        method: "POST",
      }),
    }),
    getAppointmentByUser: builder.query<ApiResponse<Appointment[]>, void>({
      query: () => ({
        url: `/motel/appointment/user`,
      }),
    }),
    getAppointmentByMotelOwner: builder.query<ApiResponse<Appointment[]>, void>(
      {
        query: () => ({
          url: `/motel/appointment/owner`,
        }),
        providesTags: ["APPOINTMENT_STATUS"],
      }
    ),
    changeAppoimentStatus: builder.mutation<
      ApiResponse<unknown>,
      { appointmentId: string; status: keyof typeof appointmentStatus }
    >({
      query: ({ appointmentId, status }) => ({
        url: `/motel/appointment/${appointmentId}/update-status?status=${status}`,
        method: "PUT",
      }),
      invalidatesTags: ["APPOINTMENT_STATUS"],
    }),

    reservation: builder.query<
      ApiResponse<ReservationCreationResponse>,
      { amount: number; motelId: string }
    >({
      query: ({ motelId, amount }) => ({
        url: `/motel/reserve/${motelId}/payment/vn-pay?amount=${amount}`,
      }),
    }),
    getReservationsByUser: builder.query<
      ApiResponse<PageResult<ReservationResponse>>,
      number
    >({
      query: (page) => ({
        url: `/motel/reserve/user?page=${page}`,
      }),
    }),
    updatePaymentStatus: builder.mutation<
      ApiResponse<null>,
      { reservationId: string; status: "PAYMENT_SUCCESS" | "PAYMENT_FAIL" }
    >({
      query: ({ reservationId, status }) => ({
        url: `/motel/reserve/${reservationId}/status?status=${status}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateRegularMotelMutation,
  useCreateAmenityMotelMutation,
  useCreateLocationMotelMutation,
  useCreatePriceMotelMutation,
  useCreateRequirementMotelMutation,
  useUploadImageyMotelMutation,
  useCreateReviewMutation,
  useGetReviewQuery,
  useBookAppointmentMutation,
  useGetAppointmentByUserQuery,
  useGetAppointmentByMotelOwnerQuery,
  useChangeAppoimentStatusMutation,
  useReservationQuery,
  useLazyReservationQuery,
  useUpdatePaymentStatusMutation,
  useGetReservationsByUserQuery,
} = motelUtilApi;
