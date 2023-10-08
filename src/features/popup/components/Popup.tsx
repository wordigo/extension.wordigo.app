import { Button } from "baseui/button"
import { Skeleton } from "baseui/skeleton"
import { Textarea } from "baseui/textarea"
import lightLogo from "data-base64:~assets/logo-light.png"
import { ArrowRightLeft, Settings } from "lucide-react"
import type { ChangeEventHandler } from "react"
import { Fragment, useEffect, useState } from "react"
import { useMutation } from "react-query"

import { sendToBackground } from "@plasmohq/messaging"

import { TranslateApi } from "~api/translate"
import CopyTranslatedText from "~components/CopyText"
import LanguageSelector from "~features/translate/components/LanguageSelector"
import TranslatePopup from "~features/translate/components/TranslatePopup/Popup"
import { StyledContentActions, StyledPopupLoader } from "~features/translate/components/TranslatePopup/Popup.styles"
import { usePopoverStore } from "~stores/popover"
import { TARGET_LANGUAGE_STORAGE, TRANSLATE_OPTION_STORAGE } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"
import { localStorage } from "~utils/storage"

import "~/styles/main.css"

import { colors } from "baseui/tokens"

import { Card, CardActions, CardContent, CardHeader, CardHeaderContent, CardHeaderContentText } from "./Popup.styles"

const ExtensionPopup = () => {
  const [value, setValue] = useState("")
  const { targetLanguage: defaultTargetLanguage } = usePopoverStore()
  const [targetLanguage, setTargetLanguage] = useState(defaultTargetLanguage)

  const { mutate: handleTranslate, isLoading, data: result } = useMutation(TranslateApi)

  const openSettingsPage = async () => {
    const opeendSettings = await sendToBackground({
      name: "openSettings"
    })
  }

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      handleTranslate({ query: value, sourceLanguage: null, targetLanguage: targetLanguage.toLowerCase() })
    }, 500)

    return () => clearTimeout(typingTimeout)
  }, [value, targetLanguage])

  return (
    <Card>
      <CardHeader>
        <CardHeaderContent className="flex flex-row items-center w-full justify-center relative">
          <img src={lightLogo} width={100} height={40} alt="Logo" />
          <CardHeaderContentText>
            <Button onClick={openSettingsPage} kind="secondary" size="mini">
              <Settings size={14} />
            </Button>
          </CardHeaderContentText>
        </CardHeaderContent>
        <CardActions>
          <LanguageSelector
            defaultValue={result?.data?.sourceLanguage?.toUpperCase()}
            className="!border-lg w-[200px] !bg-gray-300 !bg-opacity-30 !border-opacity-30 !border-gray-300 !text-white"
            overrides={{
              ControlContainer: {
                style: {
                  borderRadius: "8px",
                  // write above tailwindcss classnames to style the component
                  width: "200px",
                  height: "40px",
                  backgroundColor: `rgb(209 213 219)`,
                  borderColor: colors.gray300,
                  borderWidth: "1px",
                  color: "white"
                }
              }
            }}
            // detectLanguage={getLocalMessage("detect_language")}
            // providerLanguages
          />
          <ArrowRightLeft className="!text-gray-300" size={20} />
          <LanguageSelector
            defaultValue={targetLanguage}
            // onSelect={(lang) => setTargetLanguage(lang)}
            className="!border-lg w-[200px] !bg-gray-300 !bg-opacity-30 !border-opacity-30 !border-gray-300 !text-white"
            // providerLanguages
          />
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
  const { targetLanguage } = usePopoverStore()

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {isLoading ? (
        <ExtensionPopup.Loader />
      ) : (
        <Fragment>
          <Textarea rows={3} onChange={(event) => onChange(event)} overrides={{ Root: { style: { borderRadius: "2px" } } }} value={value} size="compact" clearOnEscape {...attr} />
          <StyledContentActions>
            <TranslatePopup.AudioPlayer message={value} targetLanguage={targetLanguage} />
            <CopyTranslatedText text={value} />
          </StyledContentActions>
        </Fragment>
      )}
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
