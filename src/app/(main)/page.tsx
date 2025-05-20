"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { setToken } from "@/services/localStorageService"
import { useOutbound } from "@/services/userApi"
import { Loader2 } from "lucide-react"

function Home() {
  const params = useSearchParams()
  const router = useRouter()
  const code = params.get("code")
  const [error, setError] = useState<string | null>(null)

  const { mutateAsync: outbound } = useOutbound()

  useEffect(() => {
    const handleAuth = async () => {
      if (!code) {
        router.replace("/motels")
        return
      }

      try {
        const data = await outbound(code)
        setToken(data.result.token)
        router.replace("/motels")
      } catch {
        setError("Xác thực thất bại. Vui lòng thử lại sau.")
        setTimeout(() => {
          router.replace("/motels")
        }, 3000)
      }
    }

    handleAuth()
  }, [code, router, outbound])

  if (error) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">{error}</p>
        <p className="text-sm text-gray-500">Chuyển hướng về trang chủ...</p>
      </div>
    )
  }

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-main-blue-s3" />
      <p className="text-gray-600">Đang xác thực...</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[500px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-main-blue-s3" />
        </div>
      }
    >
      <Home />
    </Suspense>
  )
}
