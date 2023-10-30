import { type ButtonProps } from "baseui/button"
import { FloatingRouteMarker } from "baseui/map-marker"
import { BookMarked, Languages, MoreVertical, Volume2 } from "lucide-react"
import { type ComponentPropsWithoutRef, forwardRef } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import { useTextToSpeech } from "~hooks/textToSpeech"
import { usePopoverStore } from "~stores/popover"
import { getLocalMessage } from "~utils/locale"

import Logo from "../Logo"
import { MotionCard, StyledButtonGroup, StyledContainer, StyledFloatingButton, StyledLogoContainer } from "./Button.styles"

const Floating = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(({ style }, ref) => {
  const { setFloating, setPopup, selectedText, targetLanguage } = usePopoverStore()
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
    <MotionCard
      ref={ref}
      tabIndex={500}
      id="el-popup-container"
      style={{ width: "332px", height: "40px", ...style }}
      initial={{
        marginTop: 0
      }}
      animate={{
        marginTop: 15
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
              <FloatingButton onClick={handleTogglePopup}>
                <Languages size={14} />
                {getLocalMessage("translate")}
              </FloatingButton>
              <FloatingButton onClick={handleTextToSpeech}>
                <Volume2 size={15} />
                {getLocalMessage("voice")}
              </FloatingButton>
              <FloatingButton>
                <BookMarked size={14} />
                {getLocalMessage("add")}
              </FloatingButton>
            </StyledButtonGroup>
            <FloatingButton onClick={openSettingsPage}>
              <MoreVertical size={16} />
            </FloatingButton>
          </StyledContainer>
        }></FloatingRouteMarker>
    </MotionCard>
  )
})

const FloatingButton = ({ children, ...attr }: ButtonProps) => {
  return (
    <StyledFloatingButton kind="tertiary" size="compact" {...attr}>
      {children}
    </StyledFloatingButton>
  )
}

export default Floating
