import { styled } from "baseui"
import { Button, type ButtonProps } from "baseui/button"
import { colors } from "baseui/tokens"
import { motion } from "framer-motion"
import type { ComponentType } from "react"

export const StyledContainer = styled("div", ({ $theme }) => ({
  border: `1px solid ${$theme.name === "dark-theme" ? $theme.colors.backgroundTertiary : $theme.colors.backgroundPrimary}`,
  boxShadow: $theme.lighting.shadow600,
  borderRadius: $theme.sizing.scale100,
  backgroundColor: $theme.colors.backgroundPrimary,
  rowGap: $theme.sizing.scale300,
  color: $theme.colors.contentPrimary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease"
}))

export const StyledLogoContainer = styled("div", ({ $theme }) => ({
  height: $theme.sizing.scale850,
  width: $theme.sizing.scale850,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "2px !important",
  padding: "1px",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: $theme.colors.primaryB
  }
}))

export const StyledButtonGroup = styled("div", ({ $theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRight: `1px solid ${$theme.name === "dark-theme" ? $theme.colors.backgroundTertiary : $theme.colors.backgroundPrimary}`
}))

export const StyledFloatingButton = styled(Button<ComponentType<ButtonProps>>, ({ $theme }) => ({
  boxShadow: $theme.name === "dark-theme" ? $theme.lighting.shadow600 : $theme.lighting.shadow400,
  color: $theme.name === "dark-theme" ? $theme.colors.white : colors.black,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "2px !important",
  paddingRight: $theme.sizing.scale100,
  paddingLeft: $theme.sizing.scale100,
  gap: $theme.sizing.scale200,
  maxHeight: $theme.sizing.scale850,
  height: "100%",
  cursor: "pointer",
  transition: "all 0.2s ease"
}))

export const MotionCard = styled(motion.div, () => ({
  position: "absolute",
  cursor: "pointer",
  zIndex: 50
}))
