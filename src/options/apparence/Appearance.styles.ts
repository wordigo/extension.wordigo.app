import { styled } from "baseui"

export const StyledApparenceContainer = styled("div", ({ $theme }) => ({
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

export const StyledHeaderDescription = styled("p", ({ $theme }) => ({
  color: $theme.colors.contentSecondary
}))

// grid grid-cols-3 gap-8 pt-2
export const StyledThemeContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  alignItems: "start",
  boxSizing: "border-box",
  paddingTop: $theme.sizing.scale400,
  width: "100%"
}))

type IThemeProps = {
  mode: "light" | "dark"
}

export const modeColors = {
  light: {
    backgroundColor: "rgb(236 237 239)",
    inner: "rgb(255 255 255)"
  },
  dark: {
    backgroundColor: "rgb(2 6 23)",
    inner: "rgb(30 41 59)"
  }
}

interface IThemeItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export const StyledThemeItemContainer = styled<React.ElementType, IThemeItemProps & IThemeProps>("button", ({ $theme, selected = false, mode = "light" }) => ({
  display: "flex",
  flexDirection: "column",
  boxSizing: "content-box",
  padding: $theme.sizing.scale100,
  borderRadius: $theme.borders.radius200,
  borderColor: $theme.colors.contentPrimary,
  backgroundColor: modeColors[mode].backgroundColor,
  marginRight: mode === "light" ? $theme.sizing.scale800 : "0",
  cursor: "pointer",
  borderStyle: "solid",
  borderWidth: "1px",
  ...(selected && {})
}))

export const StyledThemeItem = styled<React.ElementType, IThemeProps>("div", ({ $theme, mode = "light" }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  padding: $theme.sizing.scale300,
  backgroundColor: modeColors[mode].backgroundColor,
  height: "130px",
  cursor: "pointer",
  boxSizing: "content-box"
}))

// space-y-2 rounded-sm bg-[#ecedef] p-2
export const StyledThemeItemContainerRow = styled<React.ElementType, IThemeProps>("div", ({ $theme, mode }) => ({
  display: "flex",
  flexDirection: "row",
  columnGap: $theme.sizing.scale200,
  borderRadius: $theme.borders.radius100,
  backgroundColor: modeColors[mode].inner,
  padding: $theme.sizing.scale300,
  marginBottom: $theme.sizing.scale300,
  width: "190px",
  alignItems: "center",
  justifyContent: "center"
}))

// space-y-2 rounded-md bg-white p-2 shadow-sm

export const StyledThemeItemContainerColumn = styled<React.ElementType, IThemeProps>("div", ({ $theme, mode }) => ({
  display: "flex",
  flexDirection: "column",
  columnGap: $theme.sizing.scale200,
  borderRadius: $theme.borders.radius200,
  backgroundColor: modeColors[mode].inner,
  padding: $theme.sizing.scale300,
  boxShadow: $theme.lighting.shadow600,
  marginBottom: $theme.sizing.scale300,
  width: "190px"
}))

export const StyledThemeItemColorSelected = styled("div", ({ $theme }) => ({
  height: $theme.sizing.scale800,
  width: $theme.sizing.scale800,
  borderRadius: $theme.borders.radius200,
  backgroundColor: "#ecedef"
}))

export const StyledThemeItemTitle = styled("span", ({ $theme }) => ({
  display: "block",
  width: "100%",
  color: $theme.colors.primary,
  marginTop: $theme.sizing.scale300,
  padding: $theme.sizing.scale200,
  textAlign: "center",
  fontWeight: "normal"
}))

export const StyledFormGroup = styled("div", ({ $theme }) => ({
  marginTop: $theme.sizing.scale400,
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "start",
  columnGap: $theme.sizing.scale400,
  boxSizing: "border-box",
  marginBottom: $theme.sizing.scale900
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
