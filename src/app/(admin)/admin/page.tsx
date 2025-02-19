"use client"

import Link from "next/link"

import LoginButton from "@/components/common/login-button"

const AdminPage = () => {
  // const user = useAppSelector((state) => state.auth.user);
  // if (user && user.roles.includes("ADMIN")) navigate("/admin/home");

  return (
    <div className="flex bg-main-blue-t9 min-h-screen justify-center items-center p-4">
      <div className="border rounded-lg bg-background py-20 px-20 lg:px-40 max-w-[1000px]">
        <h3 className="text-3xl font-semibold text-main-blue-s3 mb-4">
          Trang quản lý dành cho Admin CaHouse
        </h3>
        <p>
          Để sử dụng các chức năng của quản trị viên vui lòng đăng nhập tài
          khoản Admin. Nếu bạn không phải admin vui lòng thoát ra hoặc quay lại{" "}
          <Link className="underline" href={"/"}>
            trang chủ
          </Link>
        </p>
        <LoginButton className="mt-6 px-10" />
      </div>
    </div>
  )
}

export default AdminPage
