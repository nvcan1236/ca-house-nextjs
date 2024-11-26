import { CreateMessage } from "@/utils/interfaces";
import {
  ApiResponse,
  CreatePasswordData,
  DetailUser,
  LoginForm,
  Profile,
  TokenData,
  User,
  UserStat,
} from "@/utils/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryReauth";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserDetail"],
  endpoints: (builder) => ({
    getAllUser: builder.query<ApiResponse<User[]>, void>({
      query: () => ({
        url: `/identity/users`,
      }),
    }),
    getCurrentUser: builder.query<ApiResponse<User>, void>({
      query: () => ({
        url: `/identity/users/my-infor`,
      }),
      providesTags: ["UserDetail"],
    }),

    getUserById: builder.query<ApiResponse<DetailUser>, string>({
      query: (userId) => ({
        url: `/identity/users/${userId}`,
      }),
    }),
    login: builder.mutation<ApiResponse<TokenData>, LoginForm>({
      query(data) {
        return {
          url: "/identity/auth/token",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          setTimeout(
            () => dispatch(userApi.util.invalidateTags(["UserDetail"])),
            300
          );
        } catch {
          // Xử lý lỗi
        }
      },
    }),
    updateUser: builder.mutation<ApiResponse<string>, FormData>({
      query(data) {
        return {
          url: "/identity/users/upload-avatar",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["UserDetail"],
    }),
    createPassword: builder.mutation<ApiResponse<string>, CreatePasswordData>({
      query(data) {
        return {
          url: "/identity/auth/create-password",
          method: "POST",
          body: data,
        };
      },
    }),
    getUserStat: builder.query<
      ApiResponse<UserStat>,
      {
        startDate: string;
        endDate: string;
        period?: "MONTH" | "YEAR" | "QUARTER";
      }
    >({
      query: ({ startDate, endDate, period = "MONTH" }) => ({
        url: `/identity/users/stat?startDate=${startDate}&endDate=${endDate}&period=${period}`,
      }),
    }),
    updateProfile: builder.mutation<ApiResponse<DetailUser>, Profile>({
      query: (profile) => ({
        url: `/identity/profile`,
        body: profile,
        method: "PUT",
      }),
      invalidatesTags: ["UserDetail"],
    }),
    follow: builder.mutation<ApiResponse<null>, string>({
      query: (userId) => ({
        url: `/identity/users/${userId}/follow`,
        method: "POST",
      }),
      invalidatesTags: ["UserDetail"],
    }),
    sendMessage: builder.mutation<ApiResponse<unknown>, CreateMessage>({
      query: (message) => {
        const formdata = new FormData();
        Array.from(message.images || []).forEach((image) => {
          formdata.append("images", image);
        });

        return {
          url: `/identity/chat/?content=${message.content}&type=${message.type}&recipient=${message.recipient}`,
          method: "POST",
          body: formdata,
        };
      },
      invalidatesTags: ["UserDetail"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useLoginMutation,
  useUpdateUserMutation,
  useCreatePasswordMutation,
  useGetUserStatQuery,
  useUpdateProfileMutation,
  useFollowMutation,
  useSendMessageMutation,
} = userApi;
