import { autoUpdate, flip, inline, shift, useDismiss, useFloating, useInteractions } from "@floating-ui/react"
import type { PlasmoCSConfig } from "plasmo"
import { Fragment, useEffect, useState } from "react"
import { Client as Styletron } from "styletron-engine-atomic"

import { WORDIGO_JWT_TOKEN_COOKIE } from "~constants"
import FloatingButton from "~features/translate/components/FloatingButton/Button"
import TranslatePopup from "~features/translate/components/TranslatePopup/Popup"
import Provider from "~providers"
import { useAuthStore } from "~stores/auth"
import { useDictionaryStore } from "~stores/dictionary"
import { usePopoverStore } from "~stores/popover"
import { TARGET_LANGUAGE_STORAGE, TRANSLATE_OPTION_STORAGE, translateOptionEnums } from "~utils/constants"
import { localStorage } from "~utils/storage"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

export const getShadowHostId = () => "wordigo-translate-content"

const styleElement = document.createElement("style")

export const getStyle = () => styleElement

const engine = new Styletron({
  prefix: "wordigo-",
  container: styleElement
})

const Translate = () => {
  const translatorShadowContent = document.querySelector("#wordigo-translate-content")
  const [isOpen, setIsOpen] = useState(false)

  const { isFloating, selectedText, isPopup, setFloating, setPopup, setSelectedText, translateOption, testRef } = usePopoverStore()

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [inline(), flip(), shift()],
    whileElementsMounted: autoUpdate
  })

  const dismiss = useDismiss(context)

  const { getFloatingProps } = useInteractions([dismiss])

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      const targetElement = event.target as HTMLElement
      const popupContainer = document.querySelector("#el-popup-container")
      const rootTranslatorContainer = document.querySelector<HTMLElement>("#el-translate-container")

      const tag = targetElement?.tagName
      console.log("testref", testRef)

      if (
        popupContainer?.contains(targetElement) ||
        translatorShadowContent?.contains(targetElement) ||
        rootTranslatorContainer?.contains(targetElement) ||
        tag === "INPUT" ||
        tag === "VIDEO" ||
        tag === "TEXTAREA"
      )
        return

      if (refs.floating.current?.contains(event.target as Element | null)) {
        return
      }

      setTimeout(() => {
        const selection = window.getSelection()
        const range = typeof selection?.rangeCount === "number" && selection.rangeCount > 0 ? selection.getRangeAt(0) : null

        if (selection?.isCollapsed) {
          setIsOpen(false)
          return
        }

        const selectedText = selection?.toString()

        if (selectedText) {
          setSelectedText(selectedText)
        }

        if (range) {
          refs.setReference({
            getBoundingClientRect: () => range.getBoundingClientRect(),
            getClientRects: () => range.getClientRects()
          })

          setFloating(false)
          setPopup(false)
          if (translateOption == translateOptionEnums.translate_button) {
            setFloating(true)
          } else {
            setPopup(true)
          }
          setIsOpen(true)
        } else {
          setIsOpen(false)
        }
      })
    }

    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [refs, translateOption])

  return (
    <Fragment>
      {isOpen &&
        ((isFloating && <FloatingButton style={floatingStyles} {...getFloatingProps()} ref={refs.setFloating} />) ||
          (isPopup && <TranslatePopup style={floatingStyles} {...getFloatingProps()} ref={refs.setFloating} />))}
    </Fragment>
  )
}

Translate.Layout = () => {
  const { dictionaries, getDictionaries } = useDictionaryStore()
  const [mounted, setMounted] = useState(false)
  const { setTargetLanguage, setTranslateOption } = usePopoverStore()
  const { setToken } = useAuthStore()

  const getStorages = async () => {
    const tokenStorage = await localStorage.get(WORDIGO_JWT_TOKEN_COOKIE)
    const translateOption = await localStorage.get(TRANSLATE_OPTION_STORAGE)
    const targetLanguage = await localStorage.get(TARGET_LANGUAGE_STORAGE)

    setToken(tokenStorage)
    setTargetLanguage(targetLanguage)
    setTranslateOption(translateOption)
    setMounted(true)

    if (tokenStorage) {
      const dictionariesResponse = await getDictionaries()
      if (!dictionariesResponse) {
        localStorage.remove(WORDIGO_JWT_TOKEN_COOKIE)
      }
    }
  }

  useEffect(() => {
    localStorage.watch({
      [WORDIGO_JWT_TOKEN_COOKIE]: (state) => {
        setToken(state.newValue)
      },
      [TRANSLATE_OPTION_STORAGE]: (state) => {
        setTranslateOption(state.newValue)
      },
      [TARGET_LANGUAGE_STORAGE]: (state) => {
        setTargetLanguage(state.newValue)
      }
    })

    return () => localStorage.unwatchAll()
  }, [])

  useEffect(() => {
    void getStorages()
  }, [])

  return <Provider engine={engine}>{mounted && <Translate />}</Provider>
}

export default Translate.Layout
