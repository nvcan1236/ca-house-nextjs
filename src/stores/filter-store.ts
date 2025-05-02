import { create } from "zustand"

export type FilterState = {
  roomType: string | null
  minPrice: number
  maxPrice: number
  amenities: string[]
  applied: number
}

type FilterStore = FilterState & {
  updatePrice: (min: number, max: number) => void
  updateAmenity: (amenity: string) => void
  updateMotelType: (type: string) => void
  applyFilter: () => void
  refreshFilter: () => void
}

export const MIN_PRICE = 500000
export const MAX_PRICE = 10000000

const initialState: FilterState = {
  roomType: "",
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  amenities: [],
  applied: 0,
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

  applyFilter: () =>
    set((state) => ({
      ...state,
      applied: state.applied + 1,
    })),

  refreshFilter: () =>
    set((state) => ({
      ...state,
      ...initialState,
      minPrice: MIN_PRICE,
      maxPrice: MAX_PRICE,
    })),
}))

export default useFilterStore
