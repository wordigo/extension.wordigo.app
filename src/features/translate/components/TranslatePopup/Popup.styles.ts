import { styled } from "baseui"
import { Button, type ButtonProps } from "baseui/button"
import { colors } from "baseui/tokens"
import { motion } from "framer-motion"
import type { ComponentType } from "react"

import Logo from "../Logo"

export const MotionCard = styled(motion.div, () => ({
  position: "absolute",
  zIndex: 50,
  height: "100%"
}))

export const StyledContainerWrapper = styled("div", ({ $theme }) => ({
  display: "flex",
  height: "100%",
  boxShadow: $theme.name === "dark-theme" ? $theme.lighting.shadow600 : $theme.lighting.shadow400,
  borderRadius: $theme.sizing.scale100
}))

export const StyledDraggableSidebar = styled("strong", ({ $theme }) => ({
  width: "20px",
  height: "100% !important",
  zIndex: 999,
  cursor: "all-scroll",
  display: "flex",
  backgroundColor: $theme.name === "dark-theme" ? $theme.colors.backgroundTertiary : $theme.colors.backgroundPrimary,
  alignItems: "center",
  justifyContent: "center"
}))

export const StyledContainer = styled("div", ({ $theme }) => ({
  flex: 1,
  border: `1px solid ${colors.gray200}`,
  backgroundColor: $theme.name === "dark-theme" ? $theme.colors.backgroundTertiary : $theme.colors.backgroundPrimary,
  color: $theme.colors.contentPrimary,
  zIndex: 5000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  flexDirection: "column",
  paddingTop: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale100,
  paddingLeft: $theme.sizing.scale400,
  paddingRight: $theme.sizing.scale400,
  borderLeftWidth: "0.5px",
  width: "100% !important"
}))

export const StyledContainerHeader = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: $theme.sizing.scale800,
  width: "100%"
}))

export const StyledHeader = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: $theme.sizing.scale100
}))

export const StyledLogo = styled(Logo, ({ $theme }) => ({
  height: $theme.sizing.scale850,
  width: $theme.sizing.scale850,
  borderRadius: $theme.sizing.scale100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
}))

export const StyledHeaderTitle = styled("div", ({ $theme }) => ({
  fontWeight: "bold",
  fontSize: $theme.sizing.scale550,
  color: $theme.colors.contentPrimary
}))

// w-full gap-y-2 flex flex-col
export const StyledContainerBody = styled("div", ({ $theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  rowGap: $theme.sizing.scale300,
  padding: $theme.sizing.scale300
}))

// absolute bottom-2 right-3 flex items-center justify-between gap-x-2
export const StyledContentActions = styled("div", ({ $theme }) => ({
  position: "absolute",
  bottom: $theme.sizing.scale300,
  right: $theme.sizing.scale300,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}))

export const StyledLanguageButton = styled(Button<ComponentType<ButtonProps>>, ({ $theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: $theme.sizing.scale200,
  padding: $theme.sizing.scale300
}))

export const StyledPopupLoader = styled("div", ({ $theme }) => ({
  display: "flex",
  gap: $theme.sizing.scale200,
  padding: $theme.sizing.scale300,
  flexDirection: "column",
  height: "85px"
}))

// w-full flex items-center justify-between

export const StyledPopupFooter = styled("div", ({ $theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: $theme.sizing.scale200
}))
