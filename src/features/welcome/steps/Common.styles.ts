import { styled } from "baseui"

export const StepLayout = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: $theme.sizing.scale1000
}))

export const StepContainer = styled("div", ({ $theme }) => ({
  lineHeight: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}))

export const StepTitle = styled("h1", ({ $theme }) => ({
  lineHeight: 0,
  fontSize: $theme.sizing.scale800,
  fontWeight: 500,
  color: $theme.colors.contentPrimary
}))

export const StepDescription = styled("p", ({ $theme }) => ({
  lineHeight: 1,
  color: $theme.colors.contentSecondary,
  fontSize: $theme.sizing.scale600,
  maxWidth: "30rem",
  textAlign: "center"
}))
