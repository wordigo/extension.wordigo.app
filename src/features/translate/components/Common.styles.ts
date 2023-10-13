import { styled } from "baseui"

export const StyledSelectLabel = styled("div", ({ $theme }) => ({
  ...$theme.typography.LabelSmall,
  display: "flex",
  alignItems: "center",
  gap: "0.5rem"
}))
