import { styled } from "baseui"
import { useToaster } from "react-hot-toast/headless"

export const ToasterContainer = styled("div", ({}) => ({
  pointerEvents: "none",
  zIndex: 2147483647,
  position: "fixed",
  bottom: "10px",
  right: "10px",
  inset: "16px"
}))

export const ToasterItem = styled("div", ({ $theme }) => ({
  right: "10px",
  bottom: "10px",
  position: "absolute",
  transition: "all 230ms cubic-bezier(0.21, 1.02, 0.73, 1)",
  justifyContent: "center",
  display: "flex"
}))

export const ToasterInnerContainer = styled("div", ({ $theme }) => ({
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  background: "#fff",
  color: "#363636",
  lineHeight: 1.3,
  willChange: "transform",
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05)",
  maxWidth: "350px",
  pointerEvents: "auto",
  padding: "8px 10px",
  borderRadius: "8px"
}))

export const ToasterIcon = styled("div", ({ $theme }) => ({
  position: "relative",
  transform: "scale(0.6)",
  opacity: "0.4",
  minWidth: "20px",
  animation: "$icon-anim 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards"
}))

export const ToasterMessage = styled("div", ({ $theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: "4px 10px",
  color: "inherit",
  flex: "1 1 auto",
  whiteSpace: "pre-line"
}))

export const InfoToastContainer = styled("div", ({ $theme }) => ({
  display: "flex",
  alignItems: "start",
  justifyContent: "between",
  borderRadius: "0.5rem",
  width: "100%",
  gap: "1rem"
}))

export const InfoToastTitle = styled("div", ({ $theme }) => ({
  fontSize: $theme.sizing.scale500,
  color: $theme.colors.contentSecondary,
  fontWeight: 600
}))

export const InfoToastDescription = styled("div", ({ $theme }) => ({
  fontSize: $theme.sizing.scale500,
  color: $theme.colors.contentSecondary,
  marginBottom: "0.5rem"
}))

export const InfoToastAction = styled("div", ({ $theme }) => ({
  display: "block"
}))

const Toaster = () => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers

  return (
    <ToasterContainer onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts?.map((toast: any) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8
        })

        const ref = (el: HTMLDivElement | null) => {
          if (el && typeof toast.height !== "number") {
            const height = el.getBoundingClientRect().height
            updateHeight(toast.id, height)
          }
        }

        return (
          <ToasterItem key={toast.id} ref={ref} {...toast.ariaProps} style={{ transform: `translateY(-${offset}px)` }}>
            <ToasterInnerContainer>
              <ToasterMessage role="status" aria-live="polite">
                {toast?.message}
              </ToasterMessage>
            </ToasterInnerContainer>
          </ToasterItem>
        )
      })}
    </ToasterContainer>
  )
}

export const InfoToast = ({ title, description, action }: { title: string; description: string; action?: React.ReactElement }) => {
  return (
    <InfoToastContainer>
      <div>
        <InfoToastTitle>{title}</InfoToastTitle>
        <InfoToastDescription>{description}</InfoToastDescription>
      </div>
      {action && <InfoToastAction>{action}</InfoToastAction>}
    </InfoToastContainer>
  )
}

export default Toaster
