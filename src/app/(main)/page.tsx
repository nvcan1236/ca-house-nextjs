"use client"

import { useEffect } from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { setToken } from "@/services/localStorageService"
import { useOutbound } from "@/services/userApi"

export default function Home() {
  const params = useSearchParams()
  const router = useRouter()
  const code = params.get("code")

  const { mutateAsync: outbound } = useOutbound()

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        const data = await outbound(code)
        setToken(data.result.token)
        router.push("/motels")
      }
      fetchToken()
    }
  }, [code])

  if (code)
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <p className="animate-pulse">Đang xác thực...</p>
      </div>
    )
  return redirect("/motels")
}
