import type { PlasmoMessaging } from "@plasmohq/messaging"

function blobToBase64(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export type RequestBody = { text: string; phonetic?: string }
export type RequestResponse = unknown

const handler: PlasmoMessaging.MessageHandler<RequestBody, RequestResponse> = async (req, res) => {
  try {
    const response = await fetch(`https://translate.googleapis.com/translate_tts?client=gtx&tl=${req.body.phonetic}&ie=UTF-8&q=${encodeURIComponent(req.body.text)}`, {
      referrerPolicy: "no-referrer",
      mode: "no-cors"
    })

    if (!response.ok) {
      res.send("Error fetching audio")
      return
    }

    const blob = await response.blob()
    const base64DataUrl = await blobToBase64(blob)
    const base64 = base64DataUrl.split(",")[1]

    res.send(base64)
  } catch (error) {
    console.error("Error:", error)
    res.send("An error occurred")
  }
}

export default handler
