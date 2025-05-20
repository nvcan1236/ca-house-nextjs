import { caHouseBaseUrl } from "@/configs/api-config"
import axios from "axios"

import { ApiResponse } from "@/types/common"

import { getToken, removeToken, setToken } from "./localStorageService"

const api = axios.create({
  baseURL: caHouseBaseUrl,
  headers: getToken()
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      }
    : { "Content-Type": "application/json" },
})

// Add function to reset token in axios instance
export const resetToken = () => {
  delete api.defaults.headers.common["Authorization"]
  delete authAxios.defaults.headers.common["Authorization"]
  delete formDataAxios.defaults.headers.common["Authorization"]
}

let isRefreshing = false
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedQueue: any[] = []

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken()
      resetToken()
      // window.location.href = "/motels" // điều hướng về login
    }
    return Promise.reject(error)
  }
)

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

const processQueue = (error: unknown, token: string = "") => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const token = getToken() // Lấy refresh token

    if (error.response?.status === 401 && !originalRequest._retry && token) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await authAxios.post<ApiResponse<{ token: string }>>(
          "/identity/auth/refresh",
          {
            token,
          }
        )

        const newToken = response.data.result.token
        if (newToken) {
          setToken(newToken)

          originalRequest.headers.Authorization = `Bearer ${newToken}`

          processQueue(null, newToken)

          return api(originalRequest)
        }
      } catch (refreshError) {
        processQueue(refreshError, "")
        removeToken()

        // window.location.href = "/motels"
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api

export const authAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
})

authAxios.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const formDataAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${getToken()}`,
  },
})

formDataAxios.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const noAuthAxios = axios.create({
  baseURL: caHouseBaseUrl,
  headers: { "Content-Type": "application/json" },
})
