import { create } from "zustand"

import { getUserDictionaries } from "~api/dictionary"

import type { Dictionary } from "./types"

interface IDictionaryStore {
  dictionaries: Dictionary[] | undefined
  setDictionaries: (dictionaries: Dictionary[]) => void
  getDictionaries: () => Promise<Dictionary[]> | undefined
}

export const useDictionaryStore = create<IDictionaryStore>((set) => ({
  dictionaries: undefined,
  setDictionaries: (dictionaries) => set({ dictionaries }),
  getDictionaries: async () => {
    const response = await getUserDictionaries()
    set({ dictionaries: response?.data })
    return response?.data
  }
}))
