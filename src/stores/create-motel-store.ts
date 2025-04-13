import { create } from "zustand"

import { IMotelDetail, Price } from "@/types/motel"

export type CreateMotelState = {
  id: string | null
  currentStep: number
  detailMotel: Partial<IMotelDetail> | null
}

export type CreateMotelActions = {
  setId: (id: string) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setDetailMotel: (detail: Partial<IMotelDetail>) => void
}

export type CreateMotelStore = CreateMotelState & CreateMotelActions

const defaultInitState: CreateMotelState = {
  id: null,
  currentStep: 0,
  detailMotel: null,
}

export const useCreateMotelStore = create<CreateMotelStore>((set) => ({
  ...defaultInitState,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setCurrentStep: (step) => set(() => ({ currentStep: step })),
  setId: (id) => set(() => ({ id })),
  setDetailMotel: (detail) => set(() => ({ detailMotel: detail })),
}))
