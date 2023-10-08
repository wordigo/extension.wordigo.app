import { Separator } from "~options/Options.styles"
import { getLocalMessage } from "~utils/locale"

import { StyledHeaderDescription, StyledHeaderTitle, StyledSettingsContainer } from "./Settings.styles"
import SettingsForm from "./settings-form"

const Settings = () => {
  return (
    <StyledSettingsContainer>
      <div>
        <StyledHeaderTitle>{getLocalMessage("general")}</StyledHeaderTitle>
        <StyledHeaderDescription>{getLocalMessage("generalDescription")}</StyledHeaderDescription>
      </div>
      <Separator />
      <SettingsForm />
    </StyledSettingsContainer>
  )
}

export default Settings
