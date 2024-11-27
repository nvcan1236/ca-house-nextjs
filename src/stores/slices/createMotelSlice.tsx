/* eslint-disable react-hooks/rules-of-hooks */

import { steps } from "@/lib/predefined-data";
import { Price } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  id: string | null;
  currentStep: number;
  regular: object;
  location: Location | object;
  images: object;
  amenities: object;
  requirements: object;
  prices: Price[] | [];
} = {
  // id: "ae2ef93c-a756-4ee9-a4d4-57996cf513cb",
  id: null,
  currentStep: 0,
  regular: {},
  location: {},
  images: {},
  amenities: {},
  requirements: {},
  prices: [],
};

export const createMotelSlice = createSlice({
  name: "createMotel",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep + 1 === steps.length) state.currentStep = 0;
      else state.currentStep = state.currentStep + 1;
    },
    prevStep: (state) => {
      if (state.currentStep === 0) return;
      else state.currentStep = state.currentStep - 1;
    },
  },
});

export const { nextStep, prevStep, setId, setCurrentStep } =
  createMotelSlice.actions;
export default createMotelSlice.reducer;
