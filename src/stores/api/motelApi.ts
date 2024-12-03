import { getToken } from "@/services/localStorageService";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Filter } from "../slices/filterSlice";
import baseQueryWithReauth from "./baseQueryReauth";
import {
  ApiResponse,
  IMotel,
  IMotelDetail,
  MotelStat,
  PageResult,
} from "@/lib/types";

export const motelApi = createApi({
  reducerPath: "motelApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["REVIEWS", "APPOINTMENT_STATUS", "MOTELS"],
  endpoints: (builder) => ({
    getMotels: builder.query<
      ApiResponse<PageResult<IMotel>>,
      { page?: number; size?: number; filter: Filter; isAdmin?: boolean }
    >({
      query: ({ page, size, filter, isAdmin = false }) => {
        const params = new URLSearchParams();
        const filterParam = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (size) params.append("size", size.toString());

        if (filter.applied) {
          if (filter.minPrice)
            filterParam.append("minPrice", filter.minPrice.toString());
          if (filter.maxPrice)
            filterParam.append("maxPrice", filter.maxPrice.toString());
          if (filter.roomType) filterParam.append("roomType", filter.roomType);
          if (filter.amenities.length)
            filterParam.append("amenities", filter.amenities.join(","));
        }

        return {
          url: `/motel/?${params.toString()}&${
            filterParam.size > 0 ? filterParam.toString() : ""
          }`,
          headers: isAdmin
            ? {
                Authorization: `Bearer ${getToken()}`,
              }
            : {},
        };
      },
      providesTags: ["MOTELS"],
    }),
    getMotelStat: builder.query<
      ApiResponse<MotelStat>,
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) => ({
        url: `/motel/stat?startDate=${startDate}&endDate=${endDate}&period=MONTH`,
      }),
    }),
    getMotel: builder.query<ApiResponse<IMotelDetail>, string>({
      query: (id) => `/motel/${id}`,
    }),
    getMotelByUser: builder.query<ApiResponse<IMotel[]>, string>({
      query: (userId) => ({
        url: `/motel/owner/${userId}`,
      }),
    }),
    getNearestMotels: builder.query<
      ApiResponse<IMotel[]>,
      { lon: number; lat: number; radius: number }
    >({
      query: ({ lon, lat, radius }) => {
        const params = new URLSearchParams();
        if (lon) params.append("lon", lon.toString());
        if (lat) params.append("lat", lat.toString());
        if (radius) params.append("radius", radius.toString());
        return { url: `/motel/nearest?${params.toString()}` };
      },
    }),
    approveMotel: builder.mutation<ApiResponse<null>, string>({
      query: (motelId) => ({
        url: `/motel/${motelId}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["MOTELS"],
    }),
  }),
});

export const {
  useGetMotelsQuery,
  useGetMotelQuery,
  useGetMotelByUserQuery,
  useGetMotelStatQuery,
  useGetNearestMotelsQuery,
  useApproveMotelMutation,
} = motelApi;
