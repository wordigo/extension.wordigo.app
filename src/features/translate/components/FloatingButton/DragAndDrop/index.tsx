import { List, arrayMove, arrayRemove } from "baseui/dnd-list"
import { StatefulPopover, TRIGGER_TYPE } from "baseui/popover"
import { MoreVertical } from "lucide-react"
import * as React from "react"

import Floating from "../Button"

const DragAndDrop = () => {
  const [items, setItems] = React.useState(["Item 2", "Item 3", "Item 1"])
  return (
    <StatefulPopover
      content={() => <List items={items} onChange={({ oldIndex, newIndex }) => setItems(newIndex === -1 ? arrayRemove(items, oldIndex) : arrayMove(items, oldIndex, newIndex))} />}
      returnFocus
      triggerType={TRIGGER_TYPE.hover}>
      <Floating.Button>
        <MoreVertical size={16} />
      </Floating.Button>
    </StatefulPopover>
  )
}

export default DragAndDrop
