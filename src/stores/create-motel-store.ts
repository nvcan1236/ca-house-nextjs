import { Price } from "@/lib/types";
import { createStore } from "zustand/vanilla";

export type CreateMotelState = {
  id: string | null;
  currentStep: number;
  regular: object;
  location: Location | object;
  images: object;
  amenities: object;
  requirements: object;
  prices: Price[] | [];
};

export type CreateMotelActions = {
  setId: (id: string) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
};

export type CreateMotelStore = CreateMotelState & CreateMotelActions;

export const initCreateMotelStore = (): CreateMotelState => {
  return {
    id: null,
    currentStep: 2,
    regular: {},
    location: {},
    images: {},
    amenities: {},
    requirements: {},
    prices: [],
  };
};

export const defaultInitState: CreateMotelState = {
  id: null,
  currentStep: 0,
  regular: {},
  location: {},
  images: {},
  amenities: {},
  requirements: {},
  prices: [],
};

export const createCreateMotelStore = (
  initState: CreateMotelState = defaultInitState
) => {
  return createStore<CreateMotelStore>()((set) => ({
    ...initState,
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
    setCurrentStep: (step) => set(() => ({ currentStep: step })),
    setId: (id) => set(() => ({ id })),
  }));
};
