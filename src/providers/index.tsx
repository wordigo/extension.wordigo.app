import { BaseProvider, DarkTheme } from "baseui"
import { SnackbarProvider } from "baseui/snackbar"
import type { PropsWithChildren } from "react"
import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { type Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"

import { CLightTheme } from "~themes"
import { localStorage } from "~utils/storage"

import Toaster from "./toaster"

const Provider = ({ children, engine }: PropsWithChildren<{ engine: Styletron }>) => {
  const [theme, setTheme] = useState<string>()
  const [mounted, setMounted] = useState(false)

  const [queryClient] = useState(() => new QueryClient())

  localStorage.watch({
    theme: (state) => {
      setTheme(state.newValue)
    }
  })

  const getStorages = async () => {
    const themeStorage = await localStorage.get("theme")
    setTheme(themeStorage)
    setMounted(true)
  }

  useEffect(() => {
    void getStorages()
  }, [])

  if (mounted)
    return (
      <StyletronProvider value={engine}>
        <BaseProvider overrides={{ AppContainer: { style: { height: "100%" } } }} theme={theme === "dark" ? DarkTheme : CLightTheme}>
          <SnackbarProvider>
            <Toaster />
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </SnackbarProvider>
        </BaseProvider>
      </StyletronProvider>
    )
}

export default Provider
