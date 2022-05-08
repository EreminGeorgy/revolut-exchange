import { Input } from 'semantic-ui-react'
import { InputProps } from 'semantic-ui-react/dist/commonjs/elements/Input'
import { FC, SyntheticEvent, useCallback } from 'react'

import NUMBER_INPUT_PATTERN from '../../../constants/numberInputPattern'

type Props = {
  isMain: boolean
  value: string
  handleInputChange: (value: string) => void
}

const CurrencyInput: FC<Props> = ({ isMain, value, handleInputChange }) => {

  const onChange = useCallback(
    (e: SyntheticEvent<HTMLElement, Event>, data: InputProps) => {
      const match = data.value.match(NUMBER_INPUT_PATTERN);
  
      if (!match) {
        return
      }

      handleInputChange(data.value)
  
    },
    [handleInputChange]
  )

  return (
    <div>
      <Input
        className="currency-input"
        transparent 
        placeholder='0'  
        size='large'
        value={value}
        onChange={onChange}
        data-testid={`${isMain ? 'currency-input-main' : 'currency-input-secondary'}`}
      />
    </div>
  )
}

export default CurrencyInput
