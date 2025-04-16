import { caHouseBaseUrl } from "@/configs/api-config"
import axios from "axios"

import { getToken } from "./localStorageService"

export default axios.create({
  baseURL: caHouseBaseUrl,
  headers: getToken()
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      }
    : { "Content-Type": "application/json" },
})

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
