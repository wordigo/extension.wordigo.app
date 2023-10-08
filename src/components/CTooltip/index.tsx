import { StatefulTooltip } from "baseui/tooltip"
import type { PropsWithChildren } from "react"

const CTooltip = ({ children, content }: PropsWithChildren<{ content: string }>) => {
  return (
    <StatefulTooltip
      showArrow
      overrides={{
        Arrow: {
          style: ({ $theme }) => ({
            zIndex: 50,
            backgroundColor: $theme.name === "dark-theme" ? $theme.colors.backgroundPrimary : $theme.colors.white,
            boxShadow: $theme.lighting.shadow600
          })
        },
        Body: {
          style: ({ $theme }) => ({
            zIndex: 50,
            width: "auto",
            color: $theme.colors.contentPrimary,
            backgroundColor: $theme.name === "dark-theme" ? $theme.colors.backgroundPrimary : $theme.colors.white,
            boxShadow: $theme.name === "dark-theme" ? $theme.lighting.shadow600 : $theme.lighting.shadow200,
            display: "inline-block"
          })
        },
        Inner: {
          style: ({ $theme }) => ({
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: $theme.name === "dark-theme" ? $theme.colors.backgroundPrimary : $theme.colors.white,
            boxShadow: $theme.lighting.shadow600,
            minWidth: "120px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            fontWeight: 500,
            textAlign: "center",
            display: "flex",
            color: $theme.colors.contentPrimary
          })
        }
      }}
      popoverMargin={5}
      accessibilityType={"tooltip"}
      triggerType="hover"
      placement="top"
      content={content}>
      {children}
    </StatefulTooltip>
  )
}

export default CTooltip
