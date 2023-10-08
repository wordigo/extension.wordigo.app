import { Client as Styletron } from "styletron-engine-atomic"

import Provider from "~providers"

import { getLocalMessage } from "../utils/locale"
import { Separator, StyledContainer, StyledContent, StyledContentArea, StyledContentAside, StyledHeader, StyledHeaderDescription, StyledHeaderTitle, StyledLayout } from "./Options.styles"
import Apparance from "./apparence/layout"
import { SidebarNav } from "./components/sidebar-nav"
import { OptionsContext, useOptions, useOptionsContext } from "./context/options"
import Settings from "./settings/layout"

import "~/styles/main.css"

const styleElement = document.createElement("style")

const engine = new Styletron({
  prefix: "wordigo-",
  container: styleElement
})

export const sidebarNavItems = [
  {
    title: getLocalMessage("general"),
    tab: "general"
  },
  {
    title: getLocalMessage("appearance"),
    tab: "appearance"
  }
]

const Dashboard = () => {
  const options = useOptionsContext()

  return (
    <StyledContentArea>
      {options.activeTab === "general" && <Settings />}
      {options.activeTab === "appearance" && <Apparance />}
    </StyledContentArea>
  )
}
document.body.appendChild(styleElement)

Dashboard.Layout = () => {
  const options = useOptions({})

  return (
    <Provider engine={engine}>
      <OptionsContext.Provider value={options}>
        <StyledLayout>
          <StyledContainer>
            <StyledHeader>
              <StyledHeaderTitle>{getLocalMessage("settings")}</StyledHeaderTitle>
              <StyledHeaderDescription>{getLocalMessage("settingsDescription")}</StyledHeaderDescription>
            </StyledHeader>
            <Separator />
            <StyledContent>
              <StyledContentAside>
                <SidebarNav items={sidebarNavItems} />
              </StyledContentAside>
              <Dashboard />
            </StyledContent>
          </StyledContainer>
        </StyledLayout>
      </OptionsContext.Provider>
    </Provider>
  )
}

export default Dashboard.Layout
