import { type ButtonProps } from "baseui/button"
import { FloatingRouteMarker } from "baseui/map-marker"
import { BookMarked, Languages, MoreVertical, Volume2 } from "lucide-react"
import { useRef } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { useTextToSpeech } from "~hooks/textToSpeech"
import { usePopoverStore } from "~stores/popover"
import { getPopupCordinate } from "~utils"
import { getLocalMessage } from "~utils/locale"

import Logo from "../Logo"
import { MotionCard, StyledButtonGroup, StyledContainer, StyledFloatingButton, StyledLogoContainer } from "./Button.styles"

const Floating = () => {
  const playerRef = useRef<HTMLAudioElement>()
  const { cordinate, setFloating, setPopup, selectedText, targetLanguage } = usePopoverStore()
  const { top, left } = getPopupCordinate(cordinate)
  const { textToSpeech } = useTextToSpeech()

  const handleTogglePopup = () => {
    setFloating(false)
    setPopup(true)
  }

  const handleTextToSpeech = () => {
    void textToSpeech(selectedText)
  }

  const openSettingsPage = async () => {
    const opeendSettings = await sendToBackground({
      name: "openSettings"
    })
    opeendSettings && setPopup(false)
  }

  return (
    <div>
      <MotionCard
        tabIndex={500}
        id="el-popup-container"
        initial={{
          top: top - 20,
          left: left - 100
        }}
        animate={{
          top: top + 10,
          left: left - 100
        }}>
        <FloatingRouteMarker
          anchorPosition="top-center"
          overrides={{ Root: { style: { background: "transparent", padding: "0px" } } }}
          label={
            <StyledContainer>
              <StyledLogoContainer>
                <Logo />
              </StyledLogoContainer>
              <StyledButtonGroup>
                <Floating.Button onClick={handleTogglePopup}>
                  <Languages size={14} />
                  {getLocalMessage("translate")}
                </Floating.Button>
                <Floating.Button onClick={handleTextToSpeech}>
                  <Volume2 size={15} />
                  {getLocalMessage("voice")}
                </Floating.Button>
                <Floating.Button>
                  <BookMarked size={14} />
                  {getLocalMessage("add")}
                </Floating.Button>
              </StyledButtonGroup>
              <Floating.Button onClick={openSettingsPage}>
                <MoreVertical size={16} />
              </Floating.Button>
            </StyledContainer>
          }></FloatingRouteMarker>
      </MotionCard>
    </div>
  )
}

Floating.Button = ({ children, ...attr }: ButtonProps) => {
  return (
    <StyledFloatingButton kind="tertiary" size="compact" {...attr}>
      {children}
    </StyledFloatingButton>
  )
}

export default Floating
