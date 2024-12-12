"use client"

import { createCreateMotelStore, CreateMotelStore, initCreateMotelStore } from '@/stores/create-motel-store'
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'


export type CreateMotelStoreApi = ReturnType<typeof createCreateMotelStore>

export const CreateMotelStoreContext = createContext<CreateMotelStoreApi | undefined>(
  undefined,
)

export interface CreateMotelStoreProviderProps {
  children: ReactNode
}

export const CreateMotelStoreProvider = ({
  children,
}: CreateMotelStoreProviderProps) => {
  const storeRef = useRef<CreateMotelStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createCreateMotelStore(initCreateMotelStore())
  }

  return (
    <CreateMotelStoreContext.Provider value={storeRef.current}>
      {children}
    </CreateMotelStoreContext.Provider>
  )
}

export const useCreateMotelStore = <T,>(
  selector: (store: CreateMotelStore) => T,
): T => {
  const createMotelStoreContext = useContext(CreateMotelStoreContext)

  if (!createMotelStoreContext) {
    throw new Error(`useCreateMotelStore must be used within StoreProvider`)
  }

  return useStore(createMotelStoreContext, selector)
}
