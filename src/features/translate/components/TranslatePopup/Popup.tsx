import { Button } from "baseui/button"
import { FloatingRouteMarker } from "baseui/map-marker"
import { Skeleton } from "baseui/skeleton"
import { Textarea } from "baseui/textarea"
import { colors } from "baseui/tokens"
import { ArrowRightLeft, GripVertical, Settings, X } from "lucide-react"
import { type ComponentPropsWithoutRef, Fragment, forwardRef, useEffect, useMemo } from "react"
import ReactCountryFlag from "react-country-flag"
import Draggable from "react-draggable"
import { useMutation } from "react-query"

import { sendToBackground } from "@plasmohq/messaging"

import TextCopy from "~/components/CopyText"
import { TranslateApi } from "~api/translate"
import CSkeleton from "~components/CSkeleton"
import CTooltip from "~components/CTooltip"
import { AllCountryLanguages } from "~constants"
import { usePopoverStore } from "~stores/popover"
import { getLocalMessage } from "~utils/locale"

import AuidoPlayer from "../AudioPlayer"
import SaveDictionaryWord from "../SaveDictionary"
import {
  MotionCard,
  StyledContainer,
  StyledContainerBody,
  StyledContainerHeader,
  StyledContainerWrapper,
  StyledContentActions,
  StyledDraggableSidebar,
  StyledHeader,
  StyledHeaderTitle,
  StyledLanguageButton,
  StyledLogo,
  StyledPopupFooter,
  StyledPopupLoader
} from "./Popup.styles"

const TranslatePopup = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(({ style }, ref) => {
  const { selectedText, targetLanguage, setPopup } = usePopoverStore()

  const { mutate: handleTranslate, isLoading, data: result } = useMutation(TranslateApi)

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

  const handleLandingNavigate = () => {
    window.open("https://wordigo.app/", "_blank")
  }

  const calculateRows = useMemo(() => {
    const minRows = 4
    return selectedText ? Math.max(minRows, Math.ceil(selectedText.length / 50)) : minRows
  }, [selectedText])

  return (
    <div
      ref={ref}
      tabIndex={500}
      id="el-popup-container"
      style={{
        width: "420px",
        ...style
      }}>
      <Draggable handle="strong">
        <MotionCard
          style={{
            width: "420px",
            height: "240px",
            ...style
          }}
          initial={{
            marginTop: 0
          }}
          animate={{
            marginTop: 15
          }}>
          <FloatingRouteMarker
            anchorPosition="top-center"
            overrides={{ Root: { style: { background: "transparent", padding: "0px", width: "100% !important;" } } }}
            label={
              <StyledContainerWrapper className="box">
                <StyledDraggableSidebar className="cursor">
                  <GripVertical size={14} />
                </StyledDraggableSidebar>
                <StyledContainer className="box">
                  <StyledContainerHeader>
                    <StyledHeader>
                      <StyledLogo onClick={handleLandingNavigate} />
                      <StyledHeaderTitle>{getLocalMessage("translate")}</StyledHeaderTitle>
                    </StyledHeader>
                    <StyledHeader>
                      <StyledLanguageButton size="mini" kind="secondary">
                        {isLoading || !getSourceLanguageFlag ? <CSkeleton width="16px" height="16px" animation /> : <PopupCountryFlag countryCode={getSourceLanguageFlag?.icon} />}
                        <ArrowRightLeft color={colors.gray400} size={10} />
                        <PopupCountryFlag countryCode={getTargetLanguageFlag?.icon} />
                      </StyledLanguageButton>
                      <Button onClick={handleClose} kind="tertiary" size="mini">
                        <X size={16} />
                      </Button>
                    </StyledHeader>
                  </StyledContainerHeader>
                  <StyledContainerBody>
                    <div style={{ position: "relative", width: "100%" }}>
                      {isLoading ? (
                        <TranslatePopupLoader />
                      ) : (
                        <Fragment>
                          <Textarea
                            rows={calculateRows}
                            overrides={{
                              InputContainer: { style: ({ $theme }) => ({ marginBottom: 10, background: $theme.name === "dark-theme" ? $theme.colors.black : $theme.colors.white }) },
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
                    <SettingsAction />
                    <SaveDictionaryWord translatedText={result?.data?.translatedText} sourceLangauge={result?.data?.sourceLanguage} />
                  </StyledPopupFooter>
                </StyledContainer>
              </StyledContainerWrapper>
            }
          />
        </MotionCard>
      </Draggable>
    </div>
  )
})

const SettingsAction = () => {
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

const TranslatePopupLoader = () => {
  return (
    <StyledPopupLoader>
      <Skeleton rows={2} width="100%" height="35px" animation />
    </StyledPopupLoader>
  )
}

const PopupCountryFlag = ({ countryCode }: { countryCode: string }) => {
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
