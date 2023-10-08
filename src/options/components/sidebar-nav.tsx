import { Button } from "baseui/button"

import { StyledSidebar } from "~options/Options.styles"
import { useOptionsContext } from "~options/context/options"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    tab: string
    title: string
  }[]
}

export function SidebarNav({ items, ...props }: SidebarNavProps) {
  const { activeTab, setActiveTab } = useOptionsContext()

  const handleChangeTab = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <StyledSidebar {...props}>
      {items.map((item) => (
        <Button
          key={item.tab}
          onClick={() => handleChangeTab(item.tab)}
          size="compact"
          kind={item.tab === activeTab ? "secondary" : "tertiary"}
          overrides={{ BaseButton: { style: { width: "100%", justifyContent: "start" } } }}>
          {item.title}
        </Button>
      ))}
    </StyledSidebar>
  )
}
