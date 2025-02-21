import { create } from "zustand"

export type FilterState = {
  roomType: string | null
  minPrice: number
  maxPrice: number
  amenities: string[]
  applied: boolean
}

type FilterStore = FilterState & {
  updatePrice: (min: number, max: number) => void
  updateAmenity: (amenity: string) => void
  updateMotelType: (type: string) => void
  applyFilter: (applied: boolean) => void
  refreshFilter: () => void
}

const initialState: Omit<
  FilterStore,
  | "updatePrice"
  | "updateAmenity"
  | "updateMotelType"
  | "applyFilter"
  | "refreshFilter"
> = {
  roomType: "SINGLE_ROOM",
  minPrice: 500000,
  maxPrice: 10000000,
  amenities: [],
  applied: false,
}

const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,

  updatePrice: (min, max) =>
    set((state) => ({
      ...state,
      minPrice: min,
      maxPrice: max,
    })),

  updateAmenity: (amenity) =>
    set((state) => ({
      ...state,
      amenities: state.amenities.includes(amenity)
        ? state.amenities.filter((a) => a !== amenity)
        : [...state.amenities, amenity],
    })),

  updateMotelType: (type) =>
    set((state) => ({
      ...state,
      roomType: type,
    })),

  applyFilter: (applied) =>
    set((state) => ({
      ...state,
      applied,
    })),

  refreshFilter: () => set(() => ({ ...initialState })),
}))

export default useFilterStore
