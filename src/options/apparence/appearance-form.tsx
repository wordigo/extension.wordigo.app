import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl } from "baseui/form-control"
import { Select } from "baseui/select"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import CSkeleton from "~components/CSkeleton"
import LanguageSelector from "~features/translate/components/LanguageSelector"
import { getLocalMessage, getUILanguage } from "~utils/locale"
import { localStorage } from "~utils/storage"

import {
  StyledFormGroup,
  StyledFormGroupDescription,
  StyledFormGroupTitle,
  StyledThemeContainer,
  StyledThemeItem,
  StyledThemeItemContainer,
  StyledThemeItemContainerColumn,
  StyledThemeItemContainerRow,
  StyledThemeItemTitle
} from "./Appearance.styles"

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme."
  })
})

export type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const ApparanceForm = () => {
  const [mounted, setMounted] = useState(false)
  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    mode: "onChange",
    defaultValues: {}
  })

  async function onSubmit(data: AppearanceFormValues) {
    await localStorage.set("theme", data.theme)
    // toast(<InfoToast title={getLocalMessage("successNotifyTitle")} description={getLocalMessage("successNotifyDesc")} />)
  }

  const changeThemeMode = (mode: AppearanceFormValues["theme"]) => {
    form.setValue("theme", mode)
  }

  useEffect(() => {
    void localStorage.get("theme").then((value: AppearanceFormValues["theme"]) => {
      form.reset({ theme: value || "light" })
      setMounted(true)
    })
  }, [])

  const uiLanguage = getUILanguage()?.split("-")?.[0]?.toUpperCase()

  if (mounted)
    return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormControl label={getLocalMessage("font")} caption={getLocalMessage("fontDesc")}>
          <Select
            size="compact"
            options={[{ id: "Inter" }, { id: "Manrope" }, { id: "System" }]}
            labelKey="id"
            value={[{ id: "Inter" }]}
            valueKey="color"
            // onChange={({value}) => form.setValue("font",value)}
            // value={value}
          />
        </FormControl>
        <FormControl label={getLocalMessage("uiLanguage")} caption={getLocalMessage("uiLanguageDesc")}>
          <LanguageSelector disabled defaultValue={uiLanguage} />
        </FormControl>
        <StyledFormGroup>
          <StyledFormGroupTitle>{getLocalMessage("theme")}</StyledFormGroupTitle>
          <StyledFormGroupDescription>{getLocalMessage("themeDesc")}</StyledFormGroupDescription>
          <StyledThemeContainer>
            <Controller
              control={form.control}
              name="theme"
              render={({ field }) => (
                <StyledThemeItemContainer onClick={() => changeThemeMode("light")} selected={field.value === "light"} mode="light">
                  <StyledThemeItem mode="light">
                    <StyledThemeItemContainerColumn mode="light">
                      <CSkeleton height="9px" width="50%" animation overrides={{ Root: { style: { marginBottom: "5px" } } }} />
                      <CSkeleton height="9px" width="70%" animation />
                    </StyledThemeItemContainerColumn>
                    <StyledThemeItemContainerRow mode="light">
                      <CSkeleton
                        height="20px"
                        width="20px"
                        animation
                        overrides={{
                          Root: {
                            style: {
                              borderRadius: "50%"
                            }
                          }
                        }}
                      />
                      <CSkeleton height="10px" width="100%" animation />
                    </StyledThemeItemContainerRow>
                    <StyledThemeItemContainerRow mode="light">
                      <CSkeleton
                        height="20px"
                        width="20px"
                        animation
                        overrides={{
                          Root: {
                            style: {
                              borderRadius: "50%"
                            }
                          }
                        }}
                      />
                      <CSkeleton height="10px" width="100%" animation />
                    </StyledThemeItemContainerRow>
                    <StyledThemeItemTitle>{getLocalMessage("light")}</StyledThemeItemTitle>
                  </StyledThemeItem>
                </StyledThemeItemContainer>
              )}
            />
            <Controller
              control={form.control}
              name="theme"
              render={({ field }) => (
                <StyledThemeItemContainer onClick={() => changeThemeMode("dark")} selected={field.value === "dark"} mode="dark">
                  <StyledThemeItem mode="dark">
                    <StyledThemeItemContainerColumn mode="dark">
                      <CSkeleton
                        mode="dark"
                        height="9px"
                        width="50%"
                        animation
                        overrides={{
                          Root: {
                            style: {
                              marginBottom: "5px"
                            }
                          }
                        }}
                      />
                      <CSkeleton mode="dark" height="9px" width="70%" animation />
                    </StyledThemeItemContainerColumn>
                    <StyledThemeItemContainerRow mode="dark">
                      <CSkeleton
                        mode="dark"
                        height="20px"
                        width="20px"
                        animation
                        overrides={{
                          Root: {
                            style: {
                              borderRadius: "50%"
                            }
                          }
                        }}
                      />
                      <CSkeleton mode="dark" height="10px" width="100%" animation />
                    </StyledThemeItemContainerRow>
                    <StyledThemeItemContainerRow mode="dark">
                      <CSkeleton
                        mode="dark"
                        height="20px"
                        width="20px"
                        animation
                        overrides={{
                          Root: {
                            style: {
                              borderRadius: "50%"
                            }
                          }
                        }}
                      />
                      <CSkeleton mode="dark" height="10px" width="100%" animation />
                    </StyledThemeItemContainerRow>
                    <StyledThemeItemTitle>{getLocalMessage("dark")}</StyledThemeItemTitle>
                  </StyledThemeItem>
                </StyledThemeItemContainer>
              )}
            />
          </StyledThemeContainer>
        </StyledFormGroup>
      </form>
    )
}

export default ApparanceForm
