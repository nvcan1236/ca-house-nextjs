"use client"

import React from "react"
import { useAuthStore } from "@/stores/auth-store"
import { useCreateMotelStore } from "@/stores/create-motel-store"

import { steps } from "@/lib/predefined-data"
import { Button } from "@/components/ui/button"
import H3 from "@/components/common/h3"
import MapInCreate from "@/components/map/map-in-create"
import UpdateProfileDialog from "@/components/auth/update-profile-dialog"
import { redirect } from "next/navigation"

const RegisterMotelPage = () => {
  const { user } = useAuthStore()
  const { nextStep, currentStep } = useCreateMotelStore()

  if (!user) redirect("/");

  if (!currentStep) {
    if (user?.roles.includes("OWNER")) nextStep()
    return (
      <div className="flex flex-col lg:flex-row gap-12 ">
        <div className="lg:w-1/3 w-full">
          <H3 className="text-4xl mb-5 mt-10 text-main-blue-s3 font-semibold">
            Bắt đầu cho thuê chỉ với vài bước đăng ký
          </H3>
          <p className="text-lg text-slate-600 mb-12">
            Mọi người sẽ dễ dàng tìm thấy bạn hơn khi đăng ký với caHouse. Và
            sau đó trọ của bạn sẽ xuất hiện trên bản đồ của chúng tôi
          </p>

          <UpdateProfileDialog>
            <Button size={"lg"}>Đăng ký ngay</Button>
          </UpdateProfileDialog>
        </div>
        <div className="flex-1 h-[500px]">
          <MapInCreate></MapInCreate>
        </div>
      </div>
    )
  }

  return <div className="lg:px-10">{steps[currentStep].component}</div>
}

export default RegisterMotelPage
