import {
  IComment,
  ICommentCreate,
  IPost,
  IPostCreate,
} from "@/utils/interfaces";
import { reactions } from "@/utils/predefinedData";
import { ApiResponse, PostStat, SuggestContent } from "@/utils/types";
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryReauth";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["POSTS", "COMMENTS"],
  endpoints: (builder) => ({
    getPosts: builder.query<ApiResponse<IPost[]>, number>({
      query: (offset) => {
        const param = new URLSearchParams();
        offset && param.append("offset", offset.toString());
        return {
          url: `/post/?${param.toString()}`,
        };
      },
      providesTags: ["POSTS"],
    }),
    getPostsByUser: builder.query<
      ApiResponse<IPost[]>,
      { offset: number; username: string }
    >({
      query: ({ offset, username }) => {
        const param = new URLSearchParams();
        offset && param.append("offset", offset.toString());
        return {
          url: `/post/user/${username}?${param.toString()}`,
        };
      },
      providesTags: ["POSTS"],
    }),
    getPost: builder.query<ApiResponse<IPost>, string>({
      query: (id) => `/post/${id}`,
    }),
    react: builder.mutation<
      ApiResponse<string>,
      { postId: string; type: keyof typeof reactions | null }
    >({
      query({ postId, type }) {
        const params = new URLSearchParams();
        if (type) params.append("type", type);
        return {
          url: `post/${postId}/react?${params.toString()}`,
          method: "POST",
        };
      },
      invalidatesTags: ["POSTS"],
    }),
    createPost: builder.mutation<ApiResponse<IPost>, IPostCreate>({
      query: (data) => {
        return {
          url: `/post/`,
          body: data,
          method: "POST",
        };
      },
      invalidatesTags: ["POSTS"],
    }),
    updatePost: builder.mutation<
      ApiResponse<IPost>,
      { postId: string; content: string }
    >({
      query: ({ postId, content }) => {
        return {
          url: `/post/${postId}`,
          body: {
            content,
          },
          method: "PATCH",
        };
      },
      invalidatesTags: ["POSTS"],
    }),
    uploadImage: builder.mutation<
      ApiResponse<IPost>,
      { postId: string; images: FileList }
    >({
      query: (data) => {
        const formData = new FormData();
        Array.from(data.images).forEach((image) =>
          formData.append("images", image)
        );
        return {
          url: `/post/${data.postId}/images/`,
          body: formData,
          method: "POST",
        };
      },
      invalidatesTags: ["POSTS"],
    }),
    getComments: builder.query<ApiResponse<IComment[]>, string>({
      query: (postId) => `/post/${postId}/comment`,
      providesTags: ["COMMENTS"],
    }),
    postComment: builder.mutation<
      ApiResponse<IComment>,
      { postId: string; comment: ICommentCreate }
    >({
      query: ({ postId, comment }) => {
        return {
          url: `/post/${postId}/comment`,
          body: comment,
          method: "POST",
        };
      },
      invalidatesTags: ["COMMENTS", "POSTS"],
    }),
    getSuggestPostContent: builder.mutation<
      ApiResponse<string>,
      SuggestContent
    >({
      query: (data) => ({
        url: "/post/suggest/",
        method: "POST",
        body: data,
      }),
    }),
    getPostStat: builder.query<ApiResponse<PostStat>, void>({
      query: () => ({
        url: `/post/stat/`,
      }),
    }),
  }),
});

export const {
  useGetPostQuery,
  useLazyGetPostsQuery,
  useGetPostsQuery,
  useReactMutation,
  useGetCommentsQuery,
  usePostCommentMutation,
  useCreatePostMutation,
  useUploadImageMutation,
  useGetSuggestPostContentMutation,
  useGetPostsByUserQuery,
  useGetPostStatQuery,
  useUpdatePostMutation,
} = postApi;
