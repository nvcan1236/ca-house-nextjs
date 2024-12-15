import H3 from "@/components/common/H3";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import React from "react";

const AdminPage = () => {
  return (
    <div className="px-10">
      <div className="lg:py-32 ">
        <h3 className="text-3xl font-semibold text-main-blue-s3 mb-4">
          Trang quản lý dành cho Admin CaHouse
        </h3>
        <div>
          <div>
            Xin chào,{" "}
            <span className="font-medium text-main-blue-s3">canhnguyen</span>
          </div>
          <p className="w-[400px] mt-3 text-slate-600">
            Chào mừng bạn đến với hệ thống quản trị. Hãy bắt đầu làm việc bằng
            cách xem thông tin và điều khiển các chức năng quản lý của bạn.
          </p>

          <H3 className="mt-10">Thông tin mới theo tuần</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
            <Card className="border-main-yellow bg-main-yellow-t9">
              <CardHeader>
                <span className="text-main-blue-s3 font-medium text-xl">
                  User
                </span>
                <CardDescription>Số người dùng mới tuần này</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-main-blue-s3">
                  10
                </span>
              </CardContent>
            </Card>
            <Card className="border-main-yellow bg-main-yellow-t9">
              <CardHeader>
                <span className="text-main-blue-s3 font-medium text-xl">
                  User
                </span>
                <CardDescription>Số người dùng mới tuần này</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-main-blue-s3">
                  10
                </span>
              </CardContent>
            </Card>
            <Card className="border-main-yellow bg-main-yellow-t9">
              <CardHeader>
                <span className="text-main-blue-s3 font-medium text-xl">
                  User
                </span>
                <CardDescription>Số người dùng mới tuần này</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-3xl font-semibold text-main-blue-s3">
                  10
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;