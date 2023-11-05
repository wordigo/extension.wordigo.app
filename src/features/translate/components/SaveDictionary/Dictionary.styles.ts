import { styled } from "baseui"

export const StyledSelectContainer = styled("div", ({ $theme }) => ({
  position: "absolute",
  marginTop: "6px",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  width: "115px",
  borderRadius: $theme.sizing.scale100,
  backgroundColor: $theme.colors.backgroundPrimary,
  transition: "all 0.3s ease",
  ...$theme.borders.border400
}))

export const StyledSelectButton = styled("div", ({ $theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: $theme.sizing.scale800,
  backgroundColor: $theme.colors.backgroundPrimary,
  paddingLeft: $theme.sizing.scale200,
  fontSize: $theme.sizing.scale500,
  color: $theme.colors.contentPrimary,
  width: "100%",
  ...$theme.borders.border400,
  borderTopWidth: "0 !important",
  borderLeftWidth: "0 !important",
  borderRightWidth: "0 !important"
}))
