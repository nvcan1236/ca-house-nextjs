/* eslint-disable react-hooks/rules-of-hooks */
import { language, role } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  language: language;
  role: role;
} = {
  language: "vi",
  role: "motel",
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    switchLanguage: (state, { payload }) => {
      return {
        ...state,
        language: payload,
      };
    },
    switchRole: (state, action: PayloadAction<role>) => {
      return {
        ...state,
        role: action.payload,
      };
    },
  },
});

export const { switchLanguage, switchRole } = commonSlice.actions;
export default commonSlice.reducer;
