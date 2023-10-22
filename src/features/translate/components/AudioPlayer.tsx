import { Button } from "baseui/button"
import { Volume2 } from "lucide-react"

import CTooltip from "~components/CTooltip"
import { useTextToSpeech } from "~hooks/textToSpeech"
import { getLocalMessage } from "~utils/locale"

const AuidoPlayer = ({ message }: { message: string }) => {
  const { textToSpeech } = useTextToSpeech()
  const handleTextToSpeech = () => {
    void textToSpeech(message)
  }

  return (
    <div>
      <CTooltip content={getLocalMessage("text_to_speech")}>
        <Button onClick={handleTextToSpeech} kind="tertiary" size="mini">
          <Volume2 size={16} />
        </Button>
      </CTooltip>
    </div>
  )
}

export default AuidoPlayer
