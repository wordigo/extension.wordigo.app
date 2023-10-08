import { useStyletron } from "baseui"
import { motion } from "framer-motion"
import { useMemo } from "react"

import { useSteps } from "../context/Step"
import { Progressbar, ProgressbarContainer } from "./Components.styles"

const CProgressBar = () => {
  const [css] = useStyletron()
  const { current, total } = useSteps()

  const progressCalculate = useMemo(() => (current / total) * 96, [current, total])

  return (
    <Progressbar>
      <ProgressbarContainer>
        <motion.div
          // className="bg-gradient-to-r from-primary-blue-300 to-primary-blue-500 h-3 rounded"
          className={css({
            backgroundImage: "linear-gradient(to right, #1D4ED8, #2563EB)",
            height: "12px",
            borderRadius: "4px"
          })}
          initial={{ width: "0%" }}
          animate={{ width: progressCalculate + "%" }}
          transition={{ duration: 0.5, origin: 1 }}
        />
      </ProgressbarContainer>
    </Progressbar>
  )
}

export default CProgressBar
