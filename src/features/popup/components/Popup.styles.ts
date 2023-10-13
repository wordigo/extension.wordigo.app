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
  height: "200px",
  boxShadow: "none"
}))

export const CardHeader = styled("div", ({ $theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: colors.blue300,
  height: "110px",
  padding: "15px",
  paddingTop: "10px",
  paddingBottom: "10px",
  gap: "3px",
  border: "0",
  borderEndEndRadius: "15px",
  borderEndStartRadius: "15px"
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
  position: "absolute",
  top: "100px",
  right: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "12px",
  paddingBottom: "0",
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

// absolute right-10 top-3 left-3 flex flex-col gap-y-2
export const StyledPopupLoader = styled("div", ({ $theme }) => ({
  padding: "10px",
  position: "absolute",
  right: "10px",
  top: "3px",
  left: "3px",
  display: "flex",
  flexDirection: "column",
  gap: "2px"
}))

export const SelectCustomOverrides = {
  Root: {
    style: {
      width: "300px"
    }
  },
  Placeholder: {
    style: {
      color: "white"
    }
  },
  SelectArrow: {
    props: {
      overrides: {
        Svg: {
          style: ({ $theme }) => ({
            color: "rgb(209 213 219)"
          })
        }
      }
    }
  },
  Popover: {
    props: {
      overrides: {
        Body: {
          style: ({ $theme }) => ({
            top: "10px"
          })
        }
      }
    }
  },
  Dropdown: {
    style: {
      borderRadius: "4px",
      ":hover": {
        borderColor: `rgb(209 213 219/0.7)`,
        borderWidth: "1px"
      }
    }
  },
  DropdownContainer: {
    style: {
      borderRadius: "4px"
    }
  },
  SingleValue: {
    style: {
      color: "white !important"
    }
  },
  ControlContainer: {
    style: {
      borderRadius: "4px",
      height: "30px",
      backgroundColor: `rgb(209 213 219/0.4)`,
      borderColor: `rgb(209 213 219/0.4) !important`,
      borderWidth: "1px",
      color: "white",
      outline: "0"
    }
  }
}
