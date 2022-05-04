import { Card, Dropdown, Input } from 'semantic-ui-react'
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import { InputProps } from 'semantic-ui-react/dist/commonjs/elements/Input'
import { useContext, FC, SyntheticEvent } from 'react'

import { currenciesData } from '../../../constants/currencies'
import { CurrencyDataContext } from '../../../contexts/CurrencyDataContext'
import { SET_MAIN_CURRENCY, SET_DEPENDENT_CURRENCY } from '../../../reducers/currencyDataReducer/actions'
import { InputState } from '../types'
import NUMBER_INPUT_PATTERN from '../../../constants/numberInputPattern'
import './ExchangeCard.css'

type Props = {
  isMain: boolean
  currencyValues: InputState
  setCurrencyValues: (value: InputState) => void
}

const ExchangeCard: FC<Props> = ({ isMain, currencyValues, setCurrencyValues }) => {

  const { state, dispatch, rate } = useContext(CurrencyDataContext)

  const actionType = isMain ? SET_MAIN_CURRENCY : SET_DEPENDENT_CURRENCY
  const dropdownValue = isMain ? state.mainCurrency : state.dependentCurrency
  const handleDropdownChange = (e: SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) =>  dispatch({ type: actionType, payload: data.value?.toString() || '' })

  const inputValue = isMain ? currencyValues.main : currencyValues.dependent
  const handleInputChange = (e: SyntheticEvent<HTMLElement, Event>, data: InputProps ) => {
    const match = data.value.match(NUMBER_INPUT_PATTERN);
    
    if (!match) {
      return
    }

    if (isMain) {
      setCurrencyValues({
        main: data.value,
        dependent: ((Number(data.value)*rate).toFixed(2)),
      })
    } else {
      setCurrencyValues({
        main: (Number(data.value) / rate).toFixed(2),
        dependent: data.value,
      })
    }
  }

  return (
    <Card>
      <Card.Content className="card-content">
        <div>
          <Dropdown
            inline
            search
            options={currenciesData}
            value={dropdownValue}
            onChange={handleDropdownChange}
          />
          <Card.Meta content='Musicians' />
        </div>
        <div>
          <Input
            className="currency-input"
            transparent 
            placeholder='0'  
            size='large'
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </Card.Content>
    </Card>
  )
}

export default ExchangeCard
