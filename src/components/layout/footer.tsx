import React from "react"
import Image from "next/image"
import Link from "next/link"

import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import Container from "./container"

const Footer = () => {
  return (
    <footer className=" bg-main-blue-s5 text-white py-4 ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-6 font-thin text-sm items-end">
          <div className="flex items-center flex-col">
            <Image
              src="/logo.png"
              alt="logo"
              className="object-cover"
              height={80}
              width={80}
            />
            <b className="mt-4 inline-block">Motel search website</b>
          </div>

          <div className="">
            <Label className="text-main-yellow-t6 text-lg mb-2">Dịch vụ</Label>
            <ul>
              <li>Tìm kiếm theo bộ lọc</li>
              <li>Tìm kiếm trên bản đồ</li>
              <li>Tìm kiếm qua bài đăng</li>
              <li>Hệ thống quản lý cho admin</li>
            </ul>
          </div>

          <div className="">
            <ul>
              <li>Tạo và quản lý motel</li>
              <li>Phê duyệt motel</li>
              <li>Chat realtime</li>
              <li>Đăng nhập, đăng ký</li>
            </ul>
          </div>

          <div>
            <Label className="text-main-yellow-t6 text-lg mb-2">
              Liên hệ
            </Label>
            <ul>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Tiktok</li>
              <li>Youtube</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Email</li>
              <li>Địa chỉ</li>
              <li>Phone</li>
            </ul>
          </div>
        </div>

        <Separator className=" bg-main-blue-s2" />
        <div className="opacity-50 text-xs font-thin pt-4 text-center max-w-[1000px] mx-auto">
          <p>
            CAHOUSE là nền tảng tìm kiếm motel trực tuyến giúp người dùng dễ
            dàng tìm kiếm và lựa chọn phòng trọ phù hợp với nhu cầu của mình.
          </p>
          <p>
            Thông tin nhà trọ là thông tin đã được kiểm duyệt bởi đội ngũ của
            chúng tôi. Tuy nhiên, chúng tôi không thể đảm bảo tính chính xác và
            đầy đủ của thông tin này nên người dùng cần tự kiểm tra và xác minh
            thông tin trước khi quyết định thuê nhà trọ. Chúng tôi không chịu
            trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng thông
            tin này.
          </p>
        </div>
        <div className="opacity-50 text-sm font-thin pt-4 text-center">
          <div>
            The design is inspired by{" "}
            <Link href={"https://www.airbnb.com/"}>airbnb.com</Link>
          </div>
          <div>
            Developed by{" "}
            <Link href={"https://github.com/nvcan1236"}>Nguyen Van Canh</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
