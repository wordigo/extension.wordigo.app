import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { usePopoverStore } from "~stores/popover"

export interface TextToSpeechOptions {
  targetLanguage?: string
}

export interface TextToSpeechResult {
  isSpeaking: boolean
  textToSpeech: (text: string) => Promise<void>
}

export const useTextToSpeech = (): TextToSpeechResult => {
  const { textToSpeech: phonetic } = usePopoverStore()
  const [isSpeaking, setSpeaking] = useState(false)

  const textToSpeech = async (text: string) => {
    setSpeaking(true)
    try {
      const audioBase64 = await sendToBackground({
        name: "textToSpeech",
        body: {
          text,
          phonetic
        }
      })

      const audio = new Audio()
      audio.crossOrigin = "anonymous"
      audio.src = `data:audio/mp3;base64,${audioBase64}`
      audio.play()
      audio.onplay = () => {
        setSpeaking(true)
      }
      audio.onended = () => {
        setSpeaking(false)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
    }
  }

  return {
    isSpeaking,
    textToSpeech
  }
}
