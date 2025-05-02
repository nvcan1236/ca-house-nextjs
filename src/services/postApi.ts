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

import api, { formDataAxios } from "./axios"

// React Query Hooks
export const useGetPosts = () =>
  useInfiniteQuery<ApiResponse<IPost[]>>({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      const res = await api.get(
        `/post/?${new URLSearchParams({ offset: String(pageParam) })}`
      )
      return res.data
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.result.length < 10) return undefined
      return lastPage.result.length
    },
    initialPageParam: 0,
  })

export const useGetPostsPage = (offet: number) =>
  useQuery<ApiResponse<IPost[]>>({
    queryKey: ["posts, page"],
    queryFn: async () => {
      const res = await api.get(
        `/post/?${new URLSearchParams({ offset: String(offet) })}`
      )
      return res.data
    },
  })

export const useGetPostsByUser = (offset: number, username: string) =>
  useQuery<ApiResponse<IPost[]>>({
    queryKey: ["posts", "user", username, offset],
    queryFn: async () => {
      const res = await api.get(
        `/post/user/${username}?${new URLSearchParams({ offset: offset.toString() })}`
      )
      return res.data
    },
  })

export const useGetPost = (id: string) =>
  useQuery<ApiResponse<IPost>>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await api.get(`/post/${id}`)
      return res.data
    },
  })

export const useReact = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<string>,
    unknown,
    { postId: string; type: keyof typeof reactions | null }
  >({
    mutationFn: async ({ postId, type }) => {
      const res = await api.post(
        `/post/${postId}/react?${new URLSearchParams(type ? { type } : {})}`
      )
      return res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<IPost>, unknown, IPostCreate>({
    mutationFn: async (data) => {
      const res = await api.post(`/post/`, data)
      return res.data
    },
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
    mutationFn: async ({ postId, content }) => {
      const res = await api.patch(`/post/${postId}`, { content })
      return res.data
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false }),
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
    queryFn: async () => {
      const res = await api.get(`/post/${postId}/comment`)
      return res.data
    },
    enabled,
  })

export const usePostComment = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<IComment>,
    unknown,
    { postId: string; comment: ICommentCreate }
  >({
    mutationFn: async ({ postId, comment }) => {
      const res = await api.post(`/post/${postId}/comment`, comment)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useGetSuggestPostContent = () =>
  useMutation<ApiResponse<string>, unknown, SuggestContent>({
    mutationFn: async (data) => {
      const res = await api.post("/post/suggest/", data)
      return res.data
    },
  })

export const useGetPostStat = () =>
  useQuery<ApiResponse<PostStat>>({
    queryKey: ["postStat"],
    queryFn: async () => {
      const res = await api.get(`/post/stat/`)
      return res.data
    },
  })
