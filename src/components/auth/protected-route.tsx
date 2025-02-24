"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getToken } from "@/services/localStorageService"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push("/") //
    }
  }, [])

  return <>{children}</>
}
