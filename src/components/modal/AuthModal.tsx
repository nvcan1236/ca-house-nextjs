import Modal from "../modal/Modal";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { closeAuthModal } from "@/stores/slices/authSlice";
import LoginForm from "../form/LoginForm";
import RegisterForm from "../form/RegisterForm";
import { XIcon } from "lucide-react";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const formType = useAppSelector((state) => state.auth.formType);

  return (
    <Modal>
      <div className="w-[400px] lg:w-[500px] mx-auto bg-background rounded-xl relative">
        <div className="p-10">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="absolute right-4 top-4 "
            onClick={() => dispatch(closeAuthModal())}
          >
            <XIcon></XIcon>
          </Button>
          <div onClick={(e) => e.stopPropagation()}>
            {formType === "login" && <LoginForm></LoginForm>}
            {formType === "register" && <RegisterForm></RegisterForm>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
