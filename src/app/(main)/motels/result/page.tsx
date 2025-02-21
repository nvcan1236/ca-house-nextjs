import React from "react"
import Link from "next/link"

import Container from "@/components/layout/container"

const ResultPage = () => {
  return (
    <Container>
      <div className="min-h-[500px] flex justify-center items-center">
        <div>
          <p className="text-xl font-semibold text-primary">Thành công</p>
          <p>
            Thông tin trọ sẽ được ban quản trị xét duyệt, thông tin trọ sẽ sớm
            được hiển thị với mọi người
          </p>
          <p>
            Trở về{" "}
            <Link href="/" className="underline">
              Trang chủ
            </Link>
          </p>
        </div>
      </div>
    </Container>
  )
}

export default ResultPage
