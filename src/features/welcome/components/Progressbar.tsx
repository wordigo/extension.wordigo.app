import { useStyletron } from "baseui"
import { ProgressBar } from "baseui/progress-bar"
import { useMemo } from "react"

import { useSteps } from "../context/Step"

const CProgressBar = () => {
  const [css] = useStyletron()
  const { current, total } = useSteps()

  const progressCalculate = useMemo(() => (current / total) * 70, [current, total])

  return <ProgressBar value={progressCalculate} steps={3} />
}

export default CProgressBar
