import { styled } from "baseui"

// flex flex-col items-center justify-center gap-y-10 mb-10
export const SetupLayout = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: $theme.sizing.scale1000,
  marginBottom: "10rem"
}))

// max-w-lg flex flex-col gap-y-4
export const SetupHeader = styled("div", ({ $theme }) => ({
  maxWidth: "30rem",
  display: "flex",
  flexDirection: "column",
  gap: $theme.sizing.scale400
}))

export const SetupHeaderTitle = styled("h1", ({ $theme }) => ({
  lineHeight: 0,
  fontSize: $theme.sizing.scale800,
  fontWeight: 500,
  color: $theme.colors.contentPrimary
}))

export const SetupHeaderDescription = styled("p", ({ $theme }) => ({
  lineHeight: 1,
  color: $theme.colors.contentSecondary,
  fontSize: $theme.sizing.scale600,
  maxWidth: "30rem",
  textAlign: "center"
}))

export const SetupForm = styled("form", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: $theme.sizing.scale200,
  textAlign: "start",
  width: "100%"
}))
