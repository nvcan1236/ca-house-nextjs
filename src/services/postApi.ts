import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import { ApiResponse } from "@/types/common"
import {
  IComment,
  ICommentCreate,
  IPost,
  IPostCreate,
  PostStat,
  SuggestContent,
} from "@/types/post"
import { reactions } from "@/lib/predefined-data"

import { formDataAxios } from "./axios"
import fetchWithAuth from "./baseQueryReauth"

// API Helper
const fetcher = async (url: string, options?: RequestInit) => {
  return fetchWithAuth(url, options)
}

// React Query Hooks
export const useGetPosts = () =>
  useInfiniteQuery<ApiResponse<IPost[]>>({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) =>
      fetcher(
        `/post/?${new URLSearchParams({ offset: String(pageParam) })}`
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.result.length < 10) return undefined
      return lastPage.result.length
    },
    initialPageParam: 0,
  })
export const useGetPostsByUser = (offset: number, username: string) =>
  useQuery<ApiResponse<IPost[]>>({
    queryKey: ["posts", username, offset],
    queryFn: () =>
      fetcher(
        `/post/user/${username}?${new URLSearchParams({ offset: offset.toString() })}`
      ),
  })

export const useGetPost = (id: string) =>
  useQuery<ApiResponse<IPost>>({
    queryKey: ["post", id],
    queryFn: () => fetcher(`/post/${id}`),
  })

export const useReact = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<string>,
    unknown,
    { postId: string; type: keyof typeof reactions | null }
  >({
    mutationFn: ({ postId, type }) =>
      fetcher(
        `/post/${postId}/react?${new URLSearchParams(type ? { type } : {})}`,
        { method: "POST" }
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<IPost>, unknown, IPostCreate>({
    mutationFn: (data) =>
      fetcher(`/post/`, { method: "POST", body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<IPost>,
    unknown,
    { postId: string; content: string }
  >({
    mutationFn: ({ postId, content }) =>
      fetcher(`/post/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({ content }),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })
}

export const useUploadImage = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<IPost>,
    unknown,
    { postId: string; images: FileList }
  >({
    mutationFn: ({ postId, images }) => {
      const formData = new FormData()
      Array.from(images).forEach((image) => formData.append("images", image))
      return formDataAxios.post(`/post/${postId}/images/`, formData)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })
}

export const useGetComments = (postId: string, enabled?: boolean) =>
  useQuery<ApiResponse<IComment[]>>({
    queryKey: ["comments", postId],
    queryFn: () => fetcher(`/post/${postId}/comment`),
    enabled,
  })

export const usePostComment = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<IComment>,
    unknown,
    { postId: string; comment: ICommentCreate }
  >({
    mutationFn: ({ postId, comment }) =>
      fetcher(`/post/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify(comment),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useGetSuggestPostContent = () =>
  useMutation<ApiResponse<string>, unknown, SuggestContent>({
    mutationFn: (data) =>
      fetcher("/post/suggest/", { method: "POST", body: JSON.stringify(data) }),
  })

export const useGetPostStat = () =>
  useQuery<ApiResponse<PostStat>>({
    queryKey: ["postStat"],
    queryFn: () => fetcher(`/post/stat/`),
  })
