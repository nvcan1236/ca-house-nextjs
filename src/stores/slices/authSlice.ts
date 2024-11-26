import { caHouseEndpoint } from "@/configs/api-config";
import axios from "@/services/axios";
import { getToken, removeToken } from "@/services/localStorageService";
import { User } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  showAuthModal: boolean;
  formType: "login" | "register";
  user: User | null;
} = {
  showAuthModal: false,
  formType: "login",
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openAuthModal: (state) => {
      return {
        ...state,
        showAuthModal: true,
      };
    },
    closeAuthModal: (state) => {
      return {
        ...state,
        showAuthModal: false,
      };
    },
    switchFormType: (
      state,
      action: PayloadAction<"login" | "register" | undefined>
    ) => {
      if (action.payload !== undefined) {
        state.formType = action.payload;
      } else {
        state.formType = state.formType === "login" ? "register" : "login";
      }
    },
    setUserInfor: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      axios.post(caHouseEndpoint.logout, JSON.stringify({ token: getToken() }));
      removeToken();
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const {
  openAuthModal,
  closeAuthModal,
  switchFormType,
  setUserInfor,
  logout,
} = authSlice.actions;
