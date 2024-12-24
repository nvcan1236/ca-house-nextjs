import http from "../http"

const userApiRequest = {
  getAll: () => http.get("/identity/users"),
  getById: (id: string) => http.get(`/identity/users/${id}`),
  getShortById: (id: string) => http.get(`/identity/users/${id}/short`),
  delete: (id: string) => http.delete(`/identity/users/${id}`),
  update: (id: string, body: string) => http.put(`/identity/users/${id}`, body),
  current: () => http.get("/identity/users/my-infor"),
  updateProfile: (body: string) => http.put(`/identity/profile`, body),
  getFollower: (id: string) => http.get(`/identity/users/${id}/follower`),
  getFollowing: (id: string) => http.get(`/identity/users/${id}/following`),
  stat: (start: string, end: string, period: "MONTH" | "QUARTER" = "MONTH") =>
    http.get(
      `/identity/users/stat?startDate=${start}&endDate=${end}&period=${period}`
    ),
  follow: (id: string) => http.post(`/identity/users/${id}/follow`),
  uploadAvatar: (body: FormData) =>
    http.post(`/identity/users/upload-avatar`, body),
  // TODO: FIX CHAT API
  chat: () => {},
}

export default userApiRequest
