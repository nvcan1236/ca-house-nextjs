"use client"

import { useAuthStore } from "@/stores/auth-store"

import { Dialog, DialogContent } from "../ui/dialog"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

const AuthModal = () => {
  const { authType, modalOpen, closeModal } = useAuthStore()
  return (
    <Dialog open={modalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <div className="bg-background rounded-xl relative">
          <div className="px-2 pt-4">
            <div onClick={(e) => e.stopPropagation()}>
              {authType === "login" && <LoginForm></LoginForm>}
              {authType === "signup" && <RegisterForm></RegisterForm>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
