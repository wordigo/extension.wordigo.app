import { styled } from "baseui"

// mx-auto w-full h-screen
export const WelcomeLayout = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100vh"
}))

// mt-auto h-full justify-center items-center flex flex-col mx-auto text-center py-2
export const WelcomeContainer = styled("div", ({ $theme }) => ({
  marginTop: "auto",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  paddingTop: $theme.sizing.scale800,
  paddingBottom: $theme.sizing.scale800
}))

// w-full max-w-2xl h-full mt-auto flex flex-col items-center justify-center py-6 px-2 sm:px-4 lg:px-4
export const WelcomeStepsContainer = styled("div", ({ $theme }) => ({
  width: "100%",
  maxWidth: "2xl",
  height: "100%",
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale400,
  paddingRight: $theme.sizing.scale400,
  "@media only screen and (min-width: 640px)": {
    paddingLeft: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800
  },
  "@media only screen and (min-width: 1024px)": {
    paddingLeft: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800
  }
}))
