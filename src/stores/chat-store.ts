import { User } from "@/types/auth";
import { createStore } from "zustand/vanilla";

export type AuthState = {
  modalOpen: boolean;
  authType: "login" | "signup";
  user: User | null;
};

export type AuthActions = {
  openModal: () => void;
  closeModal: () => void;
  switchAuthType: () => void;
  setUserInfor: (user: User) => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return { modalOpen: false, authType: "login", user: null };
};

export const defaultInitState: AuthState = {
  modalOpen: false,
  authType: "login",
  user: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    openModal: () => set(() => ({ modalOpen: true })),
    closeModal: () => set(() => ({ modalOpen: false })),
    switchAuthType: () =>
      set((state) => ({
        authType: state.authType === "login" ? "signup" : "login",
      })),
      setUserInfor: (user) => set(() => ({user}))
  }));
};
