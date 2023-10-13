import ExdtensionBanner from "data-base64:~assets/banners/extension.png"
import { motion } from "framer-motion"

import { framerStepAnimation } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"

import { StepContainer, StepDescription, StepLayout, StepTitle } from "../Common.styles"

const TranslateText = () => {
  return (
    <motion.div variants={framerStepAnimation} initial="hidden" animate="visible">
      <StepLayout>
        <StepContainer>
          <StepTitle>{getLocalMessage("translate_text")}</StepTitle>
          <StepDescription>{getLocalMessage("translate_text_desc")}</StepDescription>
          <img style={{ marginLeft: "auto", marginRight: "auto" }} width={600} src={ExdtensionBanner} />
        </StepContainer>
      </StepLayout>
    </motion.div>
  )
}

export default TranslateText
