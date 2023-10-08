import { Separator } from "~options/Options.styles"
import { getLocalMessage } from "~utils/locale"

import { StyledApparenceContainer, StyledHeaderDescription, StyledHeaderTitle } from "./Appearance.styles"
import ApparanceForm from "./appearance-form"

const Apparance = () => {
  return (
    <StyledApparenceContainer>
      <div>
        <StyledHeaderTitle>{getLocalMessage("appearance")}</StyledHeaderTitle>
        <StyledHeaderDescription>{getLocalMessage("apparanceDesciption")}</StyledHeaderDescription>
      </div>
      <Separator />
      <ApparanceForm />
    </StyledApparenceContainer>
  )
}

export default Apparance
