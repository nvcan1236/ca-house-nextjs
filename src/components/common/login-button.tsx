import { useAuthStore } from "@/stores/auth-store";
import { Button } from "../ui/button";

const LoginButton = ({ className, ...props }: { className?: string }) => {
  const {openModal} = useAuthStore();
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
      className={className}
      {...props}
    >
      Đăng nhập
    </Button>
  );
};

export default LoginButton;
