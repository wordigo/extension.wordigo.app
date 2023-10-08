import { type ImperativeMethods, type Option, Select, type SelectProps } from "baseui/select"
import { useEffect, useRef, useState } from "react"
import ReactCountryFlag from "react-country-flag"

import { AllCountryLanguages, type ILanguage } from "~constants"

import { StyledSelectLabel } from "./Common.styles"

export interface ILanguageSelector extends SelectProps {
  supportLanguages?: boolean
  className?: string
  defaultValue?: string
  placeholder?: string
  onSelect?: (value: ILanguage) => void
  disabled?: boolean
}

const LanguageSelector = ({ defaultValue, onSelect, placeholder = "Select a language", ...attr }: ILanguageSelector) => {
  const [selected, setSelected] = useState<any>()

  const controlRef = useRef<ImperativeMethods>(null)

  const handleSelect = (option: Option) => {
    setSelected(option.value[0])
    onSelect?.(option.value[0])
  }

  useEffect(() => {
    const computedDefaultValue = AllCountryLanguages.find((lang) => lang.code === defaultValue)
    setSelected(computedDefaultValue)
  }, [])

  const computedPlaceholder = !selected?.value && selected?.name ? "" : placeholder

  return (
    <Select
      controlRef={controlRef}
      size="compact"
      options={AllCountryLanguages}
      onChange={handleSelect}
      value={selected}
      placeholder={computedPlaceholder}
      labelKey="title"
      valueKey="code"
      multi={false}
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
  return (
    <StyledSelectLabel>
      <ReactCountryFlag
        style={{
          fontSize: "1em",
          lineHeight: "1em"
        }}
        svg
        countryCode={option.icon}
      />
      {option.name}
    </StyledSelectLabel>
  )
}

export default LanguageSelector
