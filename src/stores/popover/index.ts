import { create } from "zustand"

export interface IPopoverStore {
  isFloating: boolean
  isPopup: boolean
  selectedText: string
  sourceLanguage: string
  translateOption: string
  targetLanguage: string
  textToSpeech: string
  setTextToSpeech: (text: string) => Promise<void>
  setFloating: (floating: boolean) => void
  setPopup: (popup: boolean) => void
  setSelectedText: (text: string) => void
  setSourceLanguage: (language: string) => void
  setTargetLanguage: (language: string) => void
  setTranslateOption: (option: string) => void
}

export const usePopoverStore = create<IPopoverStore>((set) => ({
  isFloating: false,
  isPopup: false,
  selectedText: "",
  sourceLanguage: "",
  translateOption: "",
  targetLanguage: "",
  textToSpeech: "",

  setTextToSpeech: async (text) => {
    set({ textToSpeech: text })
  },
  setFloating: (floating) => set({ isFloating: floating }),
  setPopup: (popup) => set({ isPopup: popup }),
  setSelectedText: (text) => set({ selectedText: text }),
  setSourceLanguage: (language) => set({ sourceLanguage: language }),
  setTargetLanguage: (language) => set({ targetLanguage: language }),
  setTranslateOption: (option) => set({ translateOption: option })
}))
