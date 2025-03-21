"use client"

import { useEffect } from "react"
import { useGetCurrentUserQuery } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUserInfor } = useAuthStore()

  const { data } = useGetCurrentUserQuery()

  useEffect(() => {
    if (data?.result) {
      setUserInfor(data.result)
    }
  }, [data, setUserInfor])

  return <>{children}</>
}
