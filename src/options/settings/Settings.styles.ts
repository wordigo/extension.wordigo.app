import { styled } from "baseui"

export const StyledSettingsContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  columnGap: $theme.sizing.scale400
}))

export const StyledHeaderTitle = styled("h2", ({ $theme }) => ({
  color: $theme.colors.contentPrimary,
  fontSize: "1.5rem",
  fontWeight: "bold",
  letterSpacing: "-0.025em",
  lineHeight: "0"
}))

export const StyledFormControl = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  columnGap: $theme.sizing.scale400,
  boxSizing: "border-box",
  marginBottom: $theme.sizing.scale600
}))

export const StyledFormGroup = styled("div", ({ $theme }) => ({
  marginTop: $theme.sizing.scale400,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderRadius: $theme.borders.radius200,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: $theme.colors.borderOpaque,
  padding: $theme.sizing.scale500,
  columnGap: $theme.sizing.scale400,
  height: "90px",
  boxSizing: "border-box",
  marginBottom: $theme.sizing.scale100
}))

export const StyledFormGroupTitle = styled("p", ({ $theme }) => ({
  color: $theme.colors.contentPrimary,
  fontSize: "1rem",
  letterSpacing: "-0.025em",
  margin: "0",
  fontWeight: 500,
  marginBottom: $theme.sizing.scale200
}))

export const StyledFormGroupDescription = styled("p", ({ $theme }) => ({
  color: $theme.colors.contentTertiary,
  width: "80%",
  margin: " 0",
  lineHeight: $theme.sizing.scale600
}))

export const StyledHeaderDescription = styled("p", ({ $theme }) => ({
  color: $theme.colors.contentSecondary
}))
