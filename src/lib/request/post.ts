import { ReactionType } from "@/types/post"

import http from "../http"

const postApiRequest = {
  getAll: (params: string) => http.get(`/post?${params}`),
  getByUser: (userId: string, params: string) =>
    http.get(`/post/user${userId}?${params}`),
  getById: (id: string) => http.get(`/post/${id}`),
  stat: () => http.get(`/post/stat/`),
  suggest: (body: string) => http.post(`/post/stat/`, body),
  create: (body: string) => http.post(`/post/`, body),
  update: (id: string, body: string) => http.patch(`/post/${id}`, body),
  delete: (id: string) => http.delete(`/post/${id}`),
  comment: (id: string, body: string) => http.post(`/post/${id}/comment`, body),
  getComment: (postId: string) => http.get(`/post/${postId}/comment`),
  updateComment: (postId: string, commentId: string, body: string) =>
    http.patch(`/post/${postId}/comment/${commentId}`, body),
  deleteComment: (postId: string, commentId: string) =>
    http.delete(`/post/${postId}/comment/${commentId}`),
  react: (id: string, type: ReactionType) =>
    http.post(`/post/${id}/react?react_type=${type}`),
  uploadImages: (id: string, body: FormData) =>
    http.post(`/post/${id}/images`, body),
}

export default postApiRequest
