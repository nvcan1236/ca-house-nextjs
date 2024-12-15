import LoginButton from "@/components/button/LoginButton";
import { useAppSelector } from "@/stores/hooks";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (user && user.roles.includes("ADMIN")) navigate("/admin/home");

  return (
    <div className="flex flex-col md:flex-row bg-main-blue-t9 min-h-screen justify-center items-center">
      <div className="border rounded-lg bg-background py-20 px-20 lg:px-40">
        <div>
          <h3 className="text-3xl font-semibold text-main-blue-s3 mb-4">
            Trang quản lý dành cho Admin CaHouse
          </h3>
          <p>
            Để sử dụng các chức năng của quản trị viên vui lòng đăng nhập tài
            khoản Admin
          </p>
          <LoginButton className="mt-6 px-10"></LoginButton>
        </div>
      </div>
    </div>
  );
};

export default Index;
