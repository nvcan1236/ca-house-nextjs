import { create } from "zustand"

import { postType } from "@/lib/predefined-data"

type PostFilterStore = {
  filter: (keyof typeof postType)[] | string[]
  setFilter: (type: keyof typeof postType) => void
}

export const usePostFilterStore = create<PostFilterStore>((set) => ({
  filter: Object.keys(postType),
  setFilter: (type) =>
    set((state) => {
      let nextFilter = [...state.filter]
      if (state.filter.includes(type)) {
        nextFilter = state.filter.filter((t) => t != type)
      } else {
        nextFilter.push(type)
      }
      return { ...state, filter: nextFilter }
    }),
}))
