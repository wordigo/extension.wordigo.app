import { Client as Styletron } from "styletron-engine-atomic"

import TranslatePopup from "~features/popup/components/Popup"
import Provider from "~providers"

export const getShadowHostId = () => "wordigo-translate-content"

const engine = new Styletron({
  prefix: "wordigo-"
})

const Popup = () => {
  return (
    <Provider engine={engine}>
      <TranslatePopup />
    </Provider>
  )
}

export default Popup
