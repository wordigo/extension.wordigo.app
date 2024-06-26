import { Button } from "baseui/button"
import { Skeleton } from "baseui/skeleton"
import { Textarea } from "baseui/textarea"
import lightLogo from "data-base64:~assets/logo-light.png"
import { ArrowRightLeft, Settings } from "lucide-react"
import type { ChangeEventHandler } from "react"
import { useEffect, useState } from "react"
import { useMutation } from "react-query"

import { sendToBackground } from "@plasmohq/messaging"

import { TranslateApi } from "~api/translate"
import CopyTranslatedText from "~components/CopyText"
import LanguageSelector from "~features/translate/components/LanguageSelector"
import { StyledContentActions } from "~features/translate/components/TranslatePopup/Popup.styles"
import { usePopoverStore } from "~stores/popover"
import { TARGET_LANGUAGE_STORAGE, TRANSLATE_OPTION_STORAGE } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"
import { localStorage } from "~utils/storage"

import "~/styles/main.css"

import { AllCountryLanguages } from "~constants"
import AuidoPlayer from "~features/translate/components/AudioPlayer"

import { Card, CardActions, CardContent, CardHeader, CardHeaderContent, CardHeaderContentText, SelectCustomOverrides, StyledLanguageDirection, StyledPopupLoader } from "./Popup.styles"

const ExtensionPopup = () => {
  const [value, setValue] = useState("")
  const [sourceLanguage, setSourceLanguage] = useState(null)
  const { targetLanguage: defaultTargetLanguage } = usePopoverStore()
  const [targetLanguage, setTargetLanguage] = useState(defaultTargetLanguage)

  const { mutate: handleTranslate, isLoading, data: result } = useMutation(TranslateApi)

  const openSettingsPage = async () => {
    const opeendSettings = await sendToBackground({
      name: "openSettings"
    })
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const typingTimeout = setTimeout(() => {
      handleTranslate({ query: value, sourceLanguage: null, targetLanguage: targetLanguage.toLowerCase() })
    }, 500)

    return () => clearTimeout(typingTimeout)
  }, [value, targetLanguage])

  const handleLandingNavigate = () => {
    window.open("https://wordigo.app/", "_blank")
  }

  const handleChangeDirection = () => {
    if (sourceLanguage === null) return
    setTargetLanguage(sourceLanguage)
    setSourceLanguage(targetLanguage)
  }

  const getSourceLang = AllCountryLanguages.find((lang) => lang.code === sourceLanguage)
  const getTargetLang = AllCountryLanguages.find((lang) => lang.code === targetLanguage)

  return (
    <Card>
      <CardHeader>
        <CardHeaderContent>
          <img onClick={handleLandingNavigate} style={{ cursor: "pointer" }} src={lightLogo} width={100} height={40} alt="Logo" />
          <CardHeaderContentText>
            <Button onClick={openSettingsPage} overrides={{ Root: { style: { color: "white", ":hover": { background: "rgb(209 213 219/0.8)" } } } }} kind="tertiary" size="mini">
              <Settings size={16} />
            </Button>
          </CardHeaderContentText>
        </CardHeaderContent>
        <CardActions>
          <LanguageSelector
            searchable={false}
            defaultValue={getSourceLang?.code as never}
            onSelect={(lang) => setSourceLanguage(lang.code)}
            overrides={SelectCustomOverrides}
            detectLanguage={getLocalMessage("detect_language")}
          />
          <StyledLanguageDirection onClick={handleChangeDirection}>
            <ArrowRightLeft size={20} />
          </StyledLanguageDirection>
          <LanguageSelector searchable={false} defaultValue={getTargetLang?.code as never} onSelect={(lang) => setTargetLanguage(lang.code)} overrides={SelectCustomOverrides} />
        </CardActions>
      </CardHeader>
      <CardContent>
        <ExtensionPopup.Textarea placeholder={getLocalMessage("translate_placeholder")} value={value} onChange={(event) => setValue(event.target.value)} />
        <ExtensionPopup.Textarea isLoading={isLoading} readOnly value={isLoading ? "" : result?.data?.translatedText} onChange={(event) => {}} />
      </CardContent>
    </Card>
  )
}

ExtensionPopup.Textarea = ({
  value,
  onChange,
  isLoading,
  ...attr
}: {
  value: string
  isLoading?: boolean
  onChange: ChangeEventHandler<HTMLTextAreaElement> | undefined
  readOnly?: boolean
  placeholder?: string
}) => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Textarea
        rows={4}
        onChange={(event) => onChange(event)}
        overrides={{
          InputContainer: { style: ({ $theme }) => ({ background: $theme.name === "dark-theme" ? $theme.colors.black : $theme.colors.white, width: "100%" }) },
          Root: {
            style: {
              width: "100%",
              borderRadius: "6px",
              borderWidth: "2px",
              ":focus-within": {
                boxShadow: "none",
                borderColor: "rgb(209 213 219/0.8)"
              }
            }
          }
        }}
        value={value}
        size="compact"
        clearOnEscape
        {...attr}
      />
      {isLoading && <ExtensionPopup.Loader />}
      <StyledContentActions>
        <AuidoPlayer message={value} />
        <CopyTranslatedText text={value} />
      </StyledContentActions>
    </div>
  )
}

ExtensionPopup.Loader = () => {
  return (
    <StyledPopupLoader>
      <Skeleton rows={2} width="100%" height="60px" animation />
    </StyledPopupLoader>
  )
}

ExtensionPopup.Layout = () => {
  const [mounted, setMounted] = useState(false)
  const { setTargetLanguage, setTranslateOption } = usePopoverStore()

  localStorage.watch({
    [TRANSLATE_OPTION_STORAGE]: (state) => {
      setTranslateOption(state.newValue)
    },
    [TARGET_LANGUAGE_STORAGE]: (state) => {
      setTargetLanguage(state.newValue)
    }
  })

  const getStorages = async () => {
    const targetLanguage = await localStorage.get(TARGET_LANGUAGE_STORAGE)
    const translateOption = await localStorage.get(TRANSLATE_OPTION_STORAGE)

    setTargetLanguage(targetLanguage)
    setTranslateOption(translateOption)
    setMounted(true)
  }

  useEffect(() => {
    void getStorages()
  }, [])

  return mounted && <ExtensionPopup />
}

export default ExtensionPopup.Layout
