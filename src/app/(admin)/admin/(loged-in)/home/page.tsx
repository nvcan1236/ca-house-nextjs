"use client"
import React from "react"
import { useGetMotels } from "@/services/motelApi"
import { useGetAllUserQuery } from "@/services/userApi"
import useFilterStore from "@/stores/filter-store"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import H3 from "@/components/common/h3"
import { useGetPostsPage } from "@/services/postApi"
import { useAuthStore } from "@/stores/auth-store"

const AdminPage = () => {
  const filter = useFilterStore()
  const { data: motelsData } = useGetMotels({
    page: 1,
    size: 10,
    filter,
    isAdmin: true,
  })
  const { data: usersData } = useGetAllUserQuery()
  const { data: postsData } = useGetPostsPage(0)
  const {user} = useAuthStore()
  return (
    <div className="px-10">
      <div className="lg:py-32 ">
        <h3 className="text-3xl font-semibold text-main-blue-s3 mb-4">
          Trang quản lý dành cho Admin CaHouse
        </h3>
        <div>
          <div>
            Xin chào,{" "}
            <span className="font-medium text-main-blue-s3">{user?.username}</span>
          </div>
          <p className="w-[400px] mt-3 text-slate-600">
            Chào mừng bạn đến với hệ thống quản trị. Hãy bắt đầu làm việc bằng
            cách xem thông tin và điều khiển các chức năng quản lý của bạn.
          </p>

          <H3 className="mt-10">Thông tin tổng quan</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
            <Card className="border-main-yellow bg-main-yellow-t9">
              <CardHeader>
                <span className="text-main-blue-s3 font-medium text-xl">
                  User
                </span>
                <CardDescription>Số người dùng </CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-main-blue-s3">
                  {usersData?.result.length || 0}
                </span>
              </CardContent>
            </Card>
            <Card className="border-main-yellow bg-main-yellow-t9">
              <CardHeader>
                <span className="text-main-blue-s3 font-medium text-xl">
                  Motel
                </span>
                <CardDescription>Số nhà trọ</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-main-blue-s3">
                  {motelsData?.result?.totalElement || 0}
                </span>
              </CardContent>
            </Card>
            <Card className="border-main-yellow bg-main-yellow-t9">
              <CardHeader>
                <span className="text-main-blue-s3 font-medium text-xl">
                  Post
                </span>
                <CardDescription>Số bài đăng</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-main-blue-s3">
                  {postsData?.result?.length || 0}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
