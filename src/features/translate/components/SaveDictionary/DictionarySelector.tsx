import { useFloating, useHover, useInteractions } from "@floating-ui/react"
import { Button } from "baseui/button"
import { ChevronDown } from "lucide-react"
import React, { Fragment, useEffect, useState } from "react"
import { toast } from "react-hot-toast/headless"
import { useMutation } from "react-query"

import { sendToBackground } from "@plasmohq/messaging"

import { addDictionaryWord } from "~api/dictionary"
import { InfoToast } from "~providers/toaster"
import { useAuthStore } from "~stores/auth"
import { useDictionaryStore } from "~stores/dictionary"
import { usePopoverStore } from "~stores/popover"
import { getLocalMessage } from "~utils/locale"

import { StyledSelectButton, StyledSelectContainer } from "./Dictionary.styles"

const DictionarySelector = ({ sourceLangauge, translatedText }: { sourceLangauge: string; translatedText: string }) => {
  const localRef = React.useRef<HTMLDivElement>(null)
  const { dictionaries } = useDictionaryStore()
  const { targetLanguage, selectedText, setTestRef } = usePopoverStore()
  const { mutate: addMutate, isLoading: addIsLoading, status, data } = useMutation(addDictionaryWord)
  const { isLoggedIn } = useAuthStore()

  const openDictionaryPage = async () => {
    const openedDictionaryPage = await sendToBackground({
      name: "openPageUrl",
      body: {
        slug: data?.data?.slug
      }
    })
  }

  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })

  const hover = useHover(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  useEffect(() => {
    if (status === "success") {
      if (data.success) {
        toast(
          <InfoToast
            title={getLocalMessage("successNotifyTitle")}
            description={getLocalMessage("word_add_notify")}
            action={
              <Button size="mini" kind="secondary" onClick={openDictionaryPage}>
                {getLocalMessage("view_dictionary")}
              </Button>
            }
          />
        )
      } else {
        // toast({
        //   variant: "destructive",
        //   title: getLocalMessage("errorNotifyTitle"),
        //   description: data.message
        // })
      }
    }
  }, [status])

  const handleAddLibrary = (dictionaryId?: number, close?: () => void) => {
    if (!isLoggedIn) return
    addMutate({
      nativeLanguage: sourceLangauge.toLowerCase(),
      targetLanguage: targetLanguage.toLowerCase(),
      text: selectedText,
      translatedText,
      dictionaryId
    })
    close?.()
  }

  useEffect(() => {
    if (localRef?.current) {
      setTestRef(localRef)
    }
  }, [localRef])

  return (
    <Fragment>
      <Button ref={refs.setReference} {...getReferenceProps()} isLoading={addIsLoading} disabled={addIsLoading} size="mini">
        {getLocalMessage("save_to_libraray")}
        <ChevronDown size={16} />
      </Button>
      {isOpen && (
        <StyledSelectContainer ref={refs.setFloating} {...getFloatingProps()}>
          <StyledSelectButton>Select dictionary</StyledSelectButton>
          {dictionaries?.map((dictionary) => (
            <Button
              key={dictionary.id}
              size="mini"
              kind="tertiary"
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    borderBottom: `1px solid ${$theme.colors.gray200}`,
                    width: "100%",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                    textAlign: "left",
                    fontWeight: 400,
                    height: $theme.sizing.scale800,
                    fontSize: $theme.sizing.scale500,
                    overflow: "hidden",
                    textelipsis: "ellipsis"
                  })
                }
              }}
              onClick={() => handleAddLibrary(dictionary.id, close)}
              isLoading={addIsLoading}
              disabled={addIsLoading}>
              {dictionary.title}
            </Button>
          ))}
        </StyledSelectContainer>
      )}
    </Fragment>
  )
}

export default DictionarySelector
