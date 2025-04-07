"use client"

import { useAuthStore } from "@/stores/auth-store"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { HousePlusIcon } from "lucide-react"

export const CreateMotelButton = () => {
  const { user } = useAuthStore()
  const router = useRouter()
  const handleCreateMotel = () => {
    if (!user || !user.id) {
      toast.warning("Vui lòng đăng nhập trước!!")
      return
    }
    router.push("/motels/register")
  }
  return (
    <Button
      variant={"secondary"}
      onClick={handleCreateMotel}
      className="flex border-main-yellow text-main-yellow hover:bg-main-yellow-t6 transition-all hover:border-main-yellow hover:border-2 border-2"
    >
      <HousePlusIcon size={20} className="mr-3"/> Đăng trọ
    </Button>
  )
}
