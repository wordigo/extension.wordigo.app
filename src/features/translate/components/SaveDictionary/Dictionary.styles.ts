import { styled } from "baseui"
import { colors } from "baseui/tokens"

export const StyledSelectContainer = styled("div", ({ $theme }) => ({
  position: "absolute",
  bottom: "-140px",
  right: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  width: "115px",
  border: `0.5px solid ${colors.gray200}`,
  borderRadius: $theme.sizing.scale100
}))

export const StyledSelectButton = styled("div", ({ $theme }) => ({
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: $theme.sizing.scale800,
  backgroundColor: colors.white,
  borderBottom: `0.5px solid ${colors.gray200}`,
  paddingLeft: $theme.sizing.scale200,
  fontSize: $theme.sizing.scale500,
  color: colors.gray500,
  width: "100%"
}))
