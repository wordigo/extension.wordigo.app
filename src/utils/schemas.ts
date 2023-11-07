import { z } from "zod"

import { getLocalMessage } from "./locale"

export const SettingsFormSchema = z.object({
  targetLanguage: z.string({ required_error: getLocalMessage("select_language_required") }).nonempty(getLocalMessage("select_language_required")),
  speechLanguage: z.string({ required_error: getLocalMessage("select_language_required") }).nonempty(getLocalMessage("select_language_required")),
  select_and_translate: z.boolean().optional(),
  translate_button: z.boolean().optional()
})

export const SetupFormSchema = z.object({
  targetLanguage: z.string({ required_error: getLocalMessage("select_language_required") }).nonempty(getLocalMessage("select_language_required"))
})
