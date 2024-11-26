import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Filter = {
  roomType: string | null;
  minPrice: number;
  maxPrice: number;
  amenities: string[];
  applied: boolean;
};
const initialState: Filter = {
  roomType: "SINGLE_ROOM",
  minPrice: 500000,
  maxPrice: 10000000,
  amenities: [],
  applied: false,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updatePrice: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    updateAmenity: (state, action: PayloadAction<string>) => {
      state.amenities.includes(action.payload)
        ? (state.amenities = state.amenities.filter(
            (amen) => amen != action.payload
          ))
        : state.amenities.push(action.payload);
    },
    updateMotelType: (state, action: PayloadAction<string>) => {
      state.roomType = action.payload;
    },
    applyFilter: (state, action: PayloadAction<boolean>) => {
      state.applied = action.payload;
    },
    refreshFilter: (state) => {
      return initialState;
    },
  },
});

export const {
  updateAmenity,
  updateMotelType,
  updatePrice,
  applyFilter,
  refreshFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
