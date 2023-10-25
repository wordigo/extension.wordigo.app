import { type ImperativeMethods, type Option, Select, type SelectProps } from "baseui/select"
import { Skeleton } from "baseui/skeleton"
import { useEffect, useRef, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { AllCountryLanguages, AllLanguagesWithDetect, type ILanguage } from "~constants"
import { getLocalMessage } from "~utils/locale"

import { StyledSelectLabel } from "./Common.styles"

export interface ILanguageSelector extends SelectProps {
  supportLanguages?: boolean
  className?: string
  defaultValue?: string
  placeholder?: string
  detectLanguage?: string
  onSelect?: (value: ILanguage) => void
  disabled?: boolean
}

const LanguageSelector = ({ defaultValue, onSelect, detectLanguage, placeholder, overrides, ...attr }: ILanguageSelector) => {
  const [selected, setSelected] = useState<any>()

  const controlRef = useRef<ImperativeMethods>(null)

  const computedLanguages = detectLanguage ? AllLanguagesWithDetect : AllCountryLanguages
  const handleSelect = (option: Option) => {
    setSelected(option.value[0])
    onSelect?.(option.value[0])
  }

  useEffect(() => {
    const computedDefaultValue = computedLanguages.find((lang) => lang.code === (detectLanguage ? AllLanguagesWithDetect[0].code : defaultValue))
    setSelected(computedDefaultValue)
  }, [])

  const computedPlaceholder = !selected?.value && selected?.name ? "" : getLocalMessage("select_language")

  return (
    <Select
      controlRef={controlRef}
      size="compact"
      options={computedLanguages}
      onChange={handleSelect}
      value={selected}
      placeholder={computedPlaceholder}
      labelKey="title"
      valueKey="code"
      multi={false}
      overrides={{
        DropdownListItem: {
          style: ({ $theme }) => ({
            color: $theme.colors.contentPrimary
          })
        },
        ...overrides
      }}
      {...attr}
      filterOptions={(options, filterValue) => {
        if (!filterValue) return options
        return options.filter((option) => {
          return option?.name?.toLowerCase().includes(filterValue.toLowerCase())
        })
      }}
      valueComponent={LanguageSelector.Label}
      type="select"
      getOptionLabel={LanguageSelector.Label}
      getValueLabel={LanguageSelector.Label}></Select>
  )
}

LanguageSelector.Label = ({ option }: any) => {
  const hasDetectOption = option.code === "DT"

  return (
    <StyledSelectLabel>
      {!hasDetectOption ? (
        <ReactCountryFlag
          style={{
            fontSize: "1em",
            lineHeight: "1em"
          }}
          svg
          countryCode={option.icon}
        />
      ) : (
        <Skeleton width="14px" height="14px" />
      )}
      {option.name}
    </StyledSelectLabel>
  )
}

export default LanguageSelector
