import { getLocalMessage } from "~utils/locale"

import { Footer, FooterContainer, FooterText } from "./Components.styles"

const CFooter = () => {
  return (
    <Footer>
      <FooterContainer>
        <FooterText>{getLocalMessage("footer")}</FooterText>
      </FooterContainer>
    </Footer>
  )
}

export default CFooter
