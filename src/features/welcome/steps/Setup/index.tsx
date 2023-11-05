import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "baseui/button"
import { FormControl } from "baseui/form-control"
import { RotateCw } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import LanguageSelector from "~features/translate/components/LanguageSelector"
import { TARGET_LANGUAGE_STORAGE, TRANSLATE_OPTION_STORAGE, translateOptionEnums } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"
import type { SetupFormSchema } from "~utils/schemas"
import { SettingsFormSchema } from "~utils/schemas"
import { localStorage } from "~utils/storage"

import { SetupForm, SetupHeader, SetupHeaderDescription, SetupHeaderTitle, SetupLayout } from "./Setup.styles"

type SetupFormValues = z.infer<typeof SetupFormSchema>

const SetupPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const defaultValues: Partial<SetupFormValues> = {
    targetLanguage: ""
  }
  const form = useForm<SetupFormValues>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues,
    mode: "onChange"
  })

  const handleSaveChanges = async (values: SetupFormValues) => {
    setIsLoading(true)
    await localStorage.set(TARGET_LANGUAGE_STORAGE, values.targetLanguage)
    await localStorage.set(TRANSLATE_OPTION_STORAGE, translateOptionEnums.translate_button)
    setTimeout(() => {
      setIsLoading(false)
      window.close()
    }, 700)
  }

  return (
    <SetupLayout>
      <SetupHeader className="max-w-lg flex flex-col gap-y-4">
        <SetupHeaderTitle>{getLocalMessage("complete_install")}</SetupHeaderTitle>
        <SetupHeaderDescription>{getLocalMessage("complete_install_desc")}</SetupHeaderDescription>
      </SetupHeader>
      <SetupForm onSubmit={form.handleSubmit(handleSaveChanges)}>
        <FormControl error={form.formState?.errors?.targetLanguage?.message} label={getLocalMessage("nativeLanguage")} caption={getLocalMessage("nativeLanguageDesc")}>
          <LanguageSelector defaultValue={form.getValues("targetLanguage")} onSelect={(value) => form.setValue("targetLanguage", value.code)} />
        </FormControl>
        <Button size="compact" overrides={{ BaseButton: { style: { width: "100%" } } }} disabled={isLoading} isLoading={isLoading} type="submit">
          {isLoading ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : getLocalMessage("complete")}
        </Button>
      </SetupForm>
    </SetupLayout>
  )
}

export default SetupPage
