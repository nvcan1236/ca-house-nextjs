import { create } from "zustand"

import { postType } from "@/lib/predefined-data"

type PostFilterState = {
  filter: (keyof typeof postType)[] | string[]
  date: Date
  keyword: string
  sort: "newest" | "oldest"
  applied: number
}

type PostFilterActions = {
  setDate: (date: Date) => void
  setKeyword: (keyword: string) => void
  setSort: (sort: "newest" | "oldest") => void
  setFilter: (type: keyof typeof postType) => void
  setApplied: () => void
}

type PostFilterStore = PostFilterState & PostFilterActions

export const usePostFilterStore = create<PostFilterStore>((set) => ({
  filter: Object.keys(postType),
  date: new Date(),
  keyword: "",
  sort: "newest",
  applied: 0,
  setSort: (sort: "newest" | "oldest") => set({ sort }),
  setKeyword: (keyword: string) => set({ keyword }),
  setDate: (date: Date) => set({ date }),
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
  setApplied: () => set((state) => ({ ...state, applied: state.applied + 1 })),
}))
