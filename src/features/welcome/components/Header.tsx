import Logo from "data-base64:~assets/logo.png"

import { Header, HeaderLink } from "./Components.styles"
import Progressbar from "./Progressbar"

const CHeader = () => {
  return (
    <Header>
      <Progressbar />
      <HeaderLink href="https://wordigo.app/" target="_blank">
        <img width="150px" src={Logo} />
      </HeaderLink>
    </Header>
  )
}

export default CHeader
