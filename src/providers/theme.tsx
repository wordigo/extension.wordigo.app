import type { PropsWithChildren } from "react"
import { useEffect } from "react"

import type { AppearanceFormValues } from "~options/apparence/appearance-form"
import { localStorage } from "~utils/storage"

const ThemeProvider = ({ children }: PropsWithChildren): React.ReactElement => {
  useEffect(() => {
    void localStorage.get("theme").then((value: AppearanceFormValues["theme"]) => {
      document.body.setAttribute("data-theme", value || "light")
    })
  }, [])

  localStorage.watch({
    theme: (state) => {
      document.body.setAttribute("data-theme", state.newValue || "light")
    }
  })

  return <>{children}</>
}

export default ThemeProvider
