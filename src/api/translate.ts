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
