import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { usePopoverStore } from "~stores/popover"

export interface TextToSpeechOptions {
  targetLanguage?: string
}

export interface TextToSpeechResult {
  isLoading: boolean
  textToSpeech: (text: string) => Promise<void>
}

export const useTextToSpeech = (): TextToSpeechResult => {
  const { targetLanguage } = usePopoverStore()
  const [isLoading, setIsLoading] = useState(false)

  const textToSpeech = async (text: string) => {
    setIsLoading(true)
    try {
      const audioBase64 = await sendToBackground({
        name: "textToSpeech",
        body: {
          text,
          phonetic: targetLanguage
        }
      })

      const audio = new Audio()
      audio.crossOrigin = "anonymous"
      audio.src = `data:audio/mp3;base64,${audioBase64}`
      audio.play()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    textToSpeech
  }
}
