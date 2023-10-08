import { styled } from "baseui"
import { colors } from "baseui/tokens"

export const Card = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "500px",
  border: "0",
  borderRadius: "5px",
  backgroundColor: $theme.colors.white,
  backgroundOpacity: "0.4",
  position: "relative",
  height: "300px",
  boxShadow: "none"
}))

export const CardHeader = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: colors.blue300,
  height: "140px",
  padding: "4px",
  paddingTop: "2px",
  paddingBottom: "2px",
  gap: "3px",
  border: "0",
  borderRadius: "0"
}))

export const CardHeaderContent = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  position: "relative",
  gap: "3px"
}))

export const CardHeaderContentText = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "end",
  gap: "2px",
  color: $theme.colors.white,
  position: "absolute",
  right: "0"
}))

export const CardContent = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  padding: "12px",
  height: "100%",
  border: "0",
  boxShadow: "none"
}))

export const CardActions = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "2px",
  width: "100%",
  marginTop: "8px"
}))
