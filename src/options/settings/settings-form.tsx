import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "baseui/button"
import { Checkbox } from "baseui/checkbox"
import { FormControl } from "baseui/form-control"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast/headless"
import { type z } from "zod"

import LanguageSelector from "~features/translate/components/LanguageSelector"
import { InfoToast } from "~providers/toaster"
import { TARGET_LANGUAGE_STORAGE, TRANSLATE_OPTION_STORAGE, translateOptionEnums } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"
import { SettingsFormSchema } from "~utils/schemas"
import { localStorage } from "~utils/storage"

import { StyledFormControl, StyledFormGroup, StyledFormGroupDescription, StyledFormGroupTitle } from "./Settings.styles"

type SettingsFormValues = z.infer<typeof SettingsFormSchema>

export const SettingsForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const defaultValues: Partial<SettingsFormValues> = {
    targetLanguage: "",
    select_and_translate: false,
    translate_button: false
  }

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues,
    mode: "onChange"
  })

  const getStatus = async () => {
    const translateOption = await localStorage.get(TRANSLATE_OPTION_STORAGE)
    const targetLanguage = await localStorage.get(TARGET_LANGUAGE_STORAGE)
    if (translateOption === translateOptionEnums.select_and_translate) {
      form.setValue("select_and_translate", true)
    } else {
      form.setValue("translate_button", true)
    }
    form.setValue("targetLanguage", targetLanguage as never)
    setIsLoading(false)
  }

  useEffect(() => {
    void getStatus()
  }, [])

  const handleSaveChanges = async (values: SettingsFormValues) => {
    const convertStatusEnum = values.translate_button ? translateOptionEnums.translate_button : translateOptionEnums.select_and_translate

    await localStorage.set(TRANSLATE_OPTION_STORAGE, convertStatusEnum)
    await localStorage.set(TARGET_LANGUAGE_STORAGE, values.targetLanguage)

    toast(<InfoToast title={getLocalMessage("successNotifyTitle")} description={getLocalMessage("successNotifyDesc")} />)
  }

  const changeTranslateOption = (field: "select_and_translate" | "translate_button", status: boolean) => {
    if (field === "select_and_translate") form.setValue("translate_button", false)
    else form.setValue("select_and_translate", false)
    form.setValue(field, status)
  }

  if (!isLoading)
    return (
      <form className="gap-y-4" onSubmit={form.handleSubmit(handleSaveChanges)}>
        <FormControl label={getLocalMessage("targetLanguage")} caption={getLocalMessage("targetLanguageDesc")}>
          <LanguageSelector defaultValue={form.getValues("targetLanguage")} onSelect={(value) => form.setValue("targetLanguage", value.code)} />
        </FormControl>
        <div>
          <StyledFormControl>
            <StyledFormGroupTitle>{getLocalMessage("translateOption")}</StyledFormGroupTitle>
            <StyledFormGroupDescription>{getLocalMessage("translateOptionDesc")}</StyledFormGroupDescription>
            <StyledFormGroup>
              <div>
                <StyledFormGroupTitle>{getLocalMessage("showTranslate")}</StyledFormGroupTitle>
                <StyledFormGroupDescription>{getLocalMessage("showTranslateDesc")}</StyledFormGroupDescription>
              </div>
              <Controller
                name="translate_button"
                control={form.control}
                render={({ field }) => <Checkbox checked={field.value} onChange={(e) => changeTranslateOption("translate_button", e.target.checked)} checkmarkType="toggle" />}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <div>
                <StyledFormGroupTitle>{getLocalMessage("selectTranslate")}</StyledFormGroupTitle>
                <StyledFormGroupDescription>{getLocalMessage("selectTranslateDesc")}</StyledFormGroupDescription>
              </div>
              <Controller
                name="select_and_translate"
                control={form.control}
                render={({ field }) => <Checkbox checked={field.value} onChange={(e) => changeTranslateOption("select_and_translate", e.target.checked)} checkmarkType="toggle" />}
              />
            </StyledFormGroup>
          </StyledFormControl>
        </div>
        <Button size="compact" onClick={form.handleSubmit(handleSaveChanges)}>
          {getLocalMessage("saveChanges")}
        </Button>
      </form>
    )
}

export default SettingsForm
