import { styled } from "baseui"

export const Footer = styled("div", ({ $theme }) => ({
  position: "fixed",
  bottom: 0,
  textAlign: "center",
  paddingBottom: $theme.sizing.scale400
}))

export const FooterContainer = styled("div", ({ $theme }) => ({
  maxWidth: "80rem",
  margin: "0 auto",
  paddingLeft: $theme.sizing.scale800,
  paddingRight: $theme.sizing.scale800
}))

export const FooterText = styled("p", ({ $theme }) => ({
  fontSize: $theme.sizing.scale500,
  color: $theme.colors.contentSecondary
}))

export const Header = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 50,
  width: "100%",
  gap: $theme.sizing.scale400
}))

export const HeaderLink = styled("a", ({ $theme }) => ({
  paddingLeft: $theme.sizing.scale800,
  paddingRight: $theme.sizing.scale800,
  pointerEvents: "auto"
}))

// flex justify-between mb-1 w-1/2
export const Progressbar = styled("div", ({ $theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: $theme.sizing.scale100,
  width: "100%"
}))

// w-full bg-gray-200 rounded h-3 dark:bg-gray-700
export const ProgressbarContainer = styled("div", ({ $theme }) => ({
  width: "100%",
  backgroundColor: $theme.colors.backgroundSecondary,
  borderRadius: $theme.sizing.scale100,
  height: $theme.sizing.scale300
}))

// flex gap-x-4 z-50 container w-full justify-end items-center
export const StepActionsContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  gap: $theme.sizing.scale400,
  zIndex: 50,
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "center"
}))
