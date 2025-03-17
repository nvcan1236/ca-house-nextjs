import googleConfig from "@/configs/google-login-config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { User } from "@/types/auth"
import { RoomChat } from "@/types/chat"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("vi", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

export const formatDateTime = (date: string) =>
  new Date(date).toLocaleDateString("vi", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  })

export const loginWithGoogle = () => {
  const callbackUri = googleConfig.redirect_uris || ""
  const client_id = googleConfig.client_id
  const authUrli = googleConfig.auth_uri

  const targetUrl = `${authUrli}?client_id=${client_id}&redirect_uri=${encodeURIComponent(
    callbackUri
  )}&response_type=code&scope=openid%20email%20profile&`

  window.location.href = targetUrl
}

export const getPartnerChat = (room: RoomChat): User => {
  return room?.members[0]
}

export const getFullName = (user: User) =>
  `${user.firstName} ${user.lastName}`
