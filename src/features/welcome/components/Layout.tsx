import type { PropsWithChildren } from "react"
import { Client as Styletron } from "styletron-engine-atomic"

import Provider from "~providers"
import ThemeProvider from "~providers/theme"

import { StepsProvider } from "../context/Step"

const styleElement = document.createElement("style")

const engine = new Styletron({
  prefix: "wordigo-",
  container: styleElement
})

document.body.appendChild(styleElement)

const WelcomeProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider engine={engine}>
      <ThemeProvider>
        <StepsProvider>{children}</StepsProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default WelcomeProvider
