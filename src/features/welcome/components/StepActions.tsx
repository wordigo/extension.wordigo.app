import { Button } from "baseui/button"

import { getLocalMessage } from "~utils/locale"

import { useSteps } from "../context/Step"
import { StepActionsContainer } from "./Components.styles"

const StepActions = () => {
  const { current, total, prev, next } = useSteps()

  if (current === total) return

  return (
    <StepActionsContainer className="flex gap-x-4 z-50 container w-full justify-end items-center">
      <Button kind="secondary" size="mini" onClick={prev}>
        {getLocalMessage("prev")}
      </Button>
      <Button size="mini" onClick={next}>
        {getLocalMessage("next")}
      </Button>
    </StepActionsContainer>
  )
}

export default StepActions
