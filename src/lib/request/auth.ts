import http from "../http"

const authApiRequest = {
  login: (body: string) => http.post("/identity/auth/token", body),
  register: (body: string) => http.post("/identity/users", body),
  logout: (body: string) => http.post("/identity/auth/logout", body),
  refresh: (body: string) => http.post("/identity/auth/refresh", body),
  createPassword: (body: string) =>
    http.post("/identity/auth/create-password", body),
}

export default authApiRequest
