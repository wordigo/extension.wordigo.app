import { type ReactNode, createContext, useContext, useRef, useState } from "react"

const languages = {
  TR: "tr_TR",
  EN: "en_US"
} as const

interface TextToSpeechContextProps {
  textToSpeech: (word: string) => void
  isSpeaking: boolean
  spokenWord: string | null
}

interface TextToSpeechProviderProps {
  targetLanguage?: string
  children: ReactNode
}

const TextToSpeechContext = createContext<TextToSpeechContextProps | null>(null)

export const useTextToSpeech = (): TextToSpeechContextProps => {
  const context = useContext(TextToSpeechContext)
  if (!context) {
    throw new Error("useTextToSpeech must be used within a TextToSpeechProvider")
  }
  return context
}

export const TextToSpeechProvider = ({ children, targetLanguage }: TextToSpeechProviderProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [spokenWord, setSpokenWord] = useState<string | null>(null)
  const playerRef = useRef<HTMLAudioElement>(null)

  const textToSpeech = async (text) => {
    console.log("selam knk naber")

    setSpokenWord(text)
    if (playerRef.current) {
      const computedUrl = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=en&q=${encodeURI(text)}`
      playerRef.current.src = computedUrl
      void playerRef.current.play()
    }
  }

  console.log("selam knk")

  const handlePlay = () => {
    console.log("selam knks naber")

    // let test = await TextToSpeechApi({ text: spokenWord, phonetic: "tr" })
    // console.log(test)

    setIsSpeaking(true)
  }

  const handleEnded = () => {
    setIsSpeaking(false)
  }

  return (
    <TextToSpeechContext.Provider value={{ textToSpeech, isSpeaking, spokenWord }}>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      {children}
      <audio ref={playerRef} onPlay={handlePlay} onEnded={handleEnded} />
    </TextToSpeechContext.Provider>
  )
}
