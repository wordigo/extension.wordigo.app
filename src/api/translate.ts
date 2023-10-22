import instance, { type BaseResponse } from "~/libs/axios"

export interface BaseTranslate {
  sourceLanguage?: string
  targetLanguage: string
}

export type TranslateParams = BaseTranslate & { query: string }
export type TranslateResponse = BaseTranslate & { translatedText: string }

export const TranslateApi = async (params: TranslateParams): Promise<BaseResponse<TranslateResponse>> => {
  try {
    const response = await instance.post("/translation/translate", params)
    return response?.data
  } catch (err) {
    return err
  }
}

function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
export type TextToSpeechParams = { text: string; phonetic?: string }

export const TextToSpeechApi = async ({ text, phonetic = "en-US" }: TextToSpeechParams): Promise<any> => {
  const res = await fetch(`https://translate.googleapis.com/translate_tts?client=gtx&tl=${phonetic}&ie=UTF-8&q=${encodeURIComponent(text)}`, {
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "audio/mpeg"
    },
    mode: "no-cors",
    redirect: "follow"
  })
  console.log(res)

  const blob = await res.blob()
  console.log(blob)

  const base64 = await blobToBase64(blob)

  return base64
}

export async function fetchAudioAndConvertToBase64(phonetic, text) {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_tts?client=gtx&tl=${phonetic}&ie=UTF-8&q=${encodeURIComponent(text)}`, {
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "audio/mpeg"
      },
      mode: "no-cors"
    })

    console.log("response", res)

    // if (!res.ok) {
    //   throw new Error("Network response was not ok")
    // }

    const blob = await res.blob()

    console.log("blob", blob)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = function () {
        // Base64 Audio
        const base64Audio = reader.result.split(",")[1]

        console.log(reader.result)

        // Play the audio
        const audio = new Audio(`data:audio/mpeg;base64,${base64Audio}`)
        audio.play()
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}
