import { useAuthStore } from "@/providers/auth-store-provider";
import { Button } from "../ui/button";

const LoginButton = ({ className, ...props }: { className?: string }) => {
  const {openModal} = useAuthStore((state) => state);
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
