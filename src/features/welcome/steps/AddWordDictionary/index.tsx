import ExdtensionBanner from "data-base64:~assets/banners/extension.png"
import { motion } from "framer-motion"

import { framerStepAnimation } from "~utils/constants"
import { getLocalMessage } from "~utils/locale"

import { StepContainer, StepDescription, StepLayout, StepTitle } from "../Common.styles"

const AddWordDictionary = () => {
  return (
    <motion.div variants={framerStepAnimation} initial="hidden" animate="visible">
      <StepLayout>
        <StepContainer>
          <StepTitle>{getLocalMessage("add_word_dictionary")}</StepTitle>
          <StepDescription>{getLocalMessage("add_word_dictionary_desc")}</StepDescription>
          <img style={{ marginLeft: "auto", marginRight: "auto" }} width={600} src={ExdtensionBanner} />
        </StepContainer>
      </StepLayout>
    </motion.div>
  )
}

export default AddWordDictionary
