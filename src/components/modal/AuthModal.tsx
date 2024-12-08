"use client";
import { useAuthStore } from "@/providers/auth-store-provider";
import { Dialog, DialogContent } from "../ui/dialog";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";

const AuthModal = () => {
  const { authType, modalOpen, closeModal } = useAuthStore((state) => state);
  return (
    <Dialog open={modalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <div className="mx-auto bg-background rounded-xl relative">
          <div className="px-4 pt-6 pb-4">
            <div onClick={(e) => e.stopPropagation()}>
              {authType === "login" && <LoginForm></LoginForm>}
              {authType === "signup" && <RegisterForm></RegisterForm>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
