import { create } from "zustand"

import { User } from "@/types/auth"

export type AuthState = {
  modalOpen: boolean
  authType: "login" | "signup"
  user?: User
}

export type AuthActions = {
  openModal: () => void
  closeModal: () => void
  switchAuthType: () => void
  setUserInfor: (user?: User) => void
}

export type AuthStore = AuthState & AuthActions

export const defaultAuthState: AuthState = {
  modalOpen: false,
  authType: "login",
  user: undefined,
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...defaultAuthState,
  closeModal: () => set(() => ({ modalOpen: false })),
  openModal: () => set(() => ({ modalOpen: true })),
  setUserInfor: (user) => set(() => ({ user })),
  switchAuthType: () =>
    set((state) => ({
      authType: state.authType === "login" ? "signup" : "login",
    })),
}))
