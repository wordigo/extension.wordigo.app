import { Skeleton } from "baseui/skeleton"
import type { SkeletonProps } from "baseui/skeleton/types"

const linearImages = {
  dark: "linear-gradient(135deg, rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184), rgb(148, 163, 184))",
  light:
    "linear-gradient(135deg, rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(246, 246, 246), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238), rgb(238, 238, 238))"
} as const

export interface CToastOptions extends SkeletonProps {
  mode?: "light" | "dark"
}

const CSkeleton = ({ overrides, mode = "light", ...attr }: CToastOptions) => {
  const linearImage = linearImages[mode]

  return (
    <Skeleton
      {...attr}
      overrides={{
        Root: {
          style: {
            borderRadius: "2px",
            ...overrides?.Root?.style,
            // mode dark if
            backgroundImage: linearImage
          }
        }
      }}
    />
  )
}

export default CSkeleton
