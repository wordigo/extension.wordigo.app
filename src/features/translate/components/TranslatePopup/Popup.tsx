import { Button } from "baseui/button"
import { FloatingRouteMarker } from "baseui/map-marker"
import { Skeleton } from "baseui/skeleton"
import { Textarea } from "baseui/textarea"
import { colors } from "baseui/tokens"
import { ArrowRightLeft, Settings, X } from "lucide-react"
import { Fragment, useEffect, useMemo } from "react"
import ReactCountryFlag from "react-country-flag"
import { useMutation } from "react-query"

import { sendToBackground } from "@plasmohq/messaging"

import TextCopy from "~/components/CopyText"
import { TranslateApi } from "~api/translate"
import CSkeleton from "~components/CSkeleton"
import CTooltip from "~components/CTooltip"
import { AllCountryLanguages } from "~constants"
import { usePopoverStore } from "~stores/popover"
import { getPopupCordinate } from "~utils"
import { TRANSLATE_CARD_WIDTH } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"

import AuidoPlayer from "../AudioPlayer"
import SaveDictionaryWord from "../SaveDictionary"
import {
  StyledContainer,
  StyledContainerBody,
  StyledContainerHeader,
  StyledContentActions,
  StyledHeader,
  StyledHeaderTitle,
  StyledLanguageButton,
  StyledLogo,
  StyledPopupFooter,
  StyledPopupLoader
} from "./Popup.styles"

const TranslatePopup = () => {
  const { cordinate, selectedText, targetLanguage, setPopup } = usePopoverStore()
  const { mutate: handleTranslate, isLoading, data: result } = useMutation(TranslateApi)
  const { top, left } = getPopupCordinate(cordinate)

  const getSourceLanguageFlag = useMemo(() => AllCountryLanguages.find((lang) => lang.code === (result?.data?.sourceLanguage || "").toUpperCase()), [result?.data?.sourceLanguage])

  const getTargetLanguageFlag = useMemo(() => AllCountryLanguages.find((lang) => lang.code === targetLanguage.toUpperCase()), [result?.data?.targetLanguage])

  useEffect(() => {
    handleTranslate({
      query: selectedText,
      targetLanguage: targetLanguage.toLowerCase()
    })
  }, [selectedText])

  const handleClose = () => {
    setPopup(false)
  }

  return (
    <FloatingRouteMarker
      anchorPosition="top-center"
      overrides={{ Root: { style: { background: "transparent", padding: "0px" } } }}
      label={
        <StyledContainer
          tabIndex={50}
          id="el-translate-container"
          initial={{
            top: top - 20,
            left: left - 150,
            width: TRANSLATE_CARD_WIDTH
          }}
          animate={{
            top: top + 20,
            left: left - 150
          }}>
          <StyledContainerHeader>
            <StyledHeader>
              <StyledLogo />
              <StyledHeaderTitle>{getLocalMessage("translate")}</StyledHeaderTitle>
            </StyledHeader>
            <StyledHeader>
              <StyledLanguageButton size="mini" kind="secondary">
                {isLoading || !getSourceLanguageFlag ? <CSkeleton width="16px" height="16px" animation /> : <TranslatePopup.CountryFlag countryCode={getSourceLanguageFlag?.icon} />}
                <ArrowRightLeft color={colors.gray400} size={10} />
                <TranslatePopup.CountryFlag countryCode={getTargetLanguageFlag?.icon} />
              </StyledLanguageButton>
              <Button onClick={handleClose} kind="tertiary" size="mini">
                <X size={16} />
              </Button>
            </StyledHeader>
          </StyledContainerHeader>
          <StyledContainerBody>
            <div style={{ position: "relative", width: "100%" }}>
              {isLoading ? (
                <TranslatePopup.Loader />
              ) : (
                <Fragment>
                  <Textarea
                    rows={5}
                    overrides={{
                      InputContainer: { style: ({ $theme }) => ({ background: $theme.name === "dark-theme" ? $theme.colors.black : $theme.colors.white }) },
                      Root: {
                        style: {
                          borderRadius: "2px",
                          borderWidth: "1px",
                          ":focus-within": {
                            boxShadow: "none",
                            borderColor: "rgb(209 213 219/0.8)"
                          }
                        }
                      }
                    }}
                    value={result?.data?.translatedText}
                    readOnly
                    size="compact"
                    clearable
                    clearOnEscape
                  />
                  <StyledContentActions>
                    <AuidoPlayer message={selectedText} />
                    <TextCopy text={result?.data?.translatedText} />
                  </StyledContentActions>
                </Fragment>
              )}
            </div>
          </StyledContainerBody>
          <StyledPopupFooter>
            <TranslatePopup.SettingsAction />
            <SaveDictionaryWord translatedText={result?.data?.translatedText} sourceLangauge={result?.data?.sourceLanguage} />
          </StyledPopupFooter>
        </StyledContainer>
      }
    />
  )
}

TranslatePopup.AudioPlayer = AuidoPlayer

TranslatePopup.SettingsAction = () => {
  const { setPopup } = usePopoverStore()

  const openSettingsPage = async () => {
    const opeendSettings = await sendToBackground({
      name: "openSettings"
    })
    opeendSettings && setPopup(false)
  }

  return (
    <CTooltip content={getLocalMessage("open_settings")}>
      <Button onClick={openSettingsPage} size="mini" kind="secondary">
        <Settings size={17} />
      </Button>
    </CTooltip>
  )
}

TranslatePopup.Loader = () => {
  return (
    <StyledPopupLoader>
      <Skeleton rows={2} width="100%" height="60px" animation />
    </StyledPopupLoader>
  )
}

TranslatePopup.CountryFlag = ({ countryCode }: { countryCode: string }) => {
  return (
    <ReactCountryFlag
      style={{
        fontSize: "1em",
        lineHeight: "1em"
      }}
      svg
      countryCode={countryCode || "DT"}
    />
  )
}

export default TranslatePopup
