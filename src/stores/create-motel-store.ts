import { create } from "zustand"

import { Price } from "@/types/motel"

export type CreateMotelState = {
  id: string | null
  currentStep: number
  regular: object
  location: Location | object
  images: object
  amenities: object
  requirements: object
  prices: Price[] | []
}

export type CreateMotelActions = {
  setId: (id: string) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
}

export type CreateMotelStore = CreateMotelState & CreateMotelActions

const defaultInitState: CreateMotelState = {
  id: null,
  currentStep: 0,
  regular: {},
  location: {},
  images: {},
  amenities: {},
  requirements: {},
  prices: [],
}

export const useCreateMotelStore = create<CreateMotelStore>((set) => ({
  ...defaultInitState,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
  setId: (id) => set(() => ({ id })),
}))
