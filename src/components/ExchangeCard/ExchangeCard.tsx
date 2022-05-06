import { Card, Dropdown, Input } from 'semantic-ui-react'
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import { InputProps } from 'semantic-ui-react/dist/commonjs/elements/Input'
import { useContext, FC, SyntheticEvent, useCallback, useMemo } from 'react'

import { CURRENCIES, currenciesData } from '../../constants/currencies'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { SET_MAIN_CURRENCY, SET_DEPENDENT_CURRENCY } from '../../reducers/currencyDataReducer/actions'
import { InputState, WalletsState } from '../types'
import NUMBER_INPUT_PATTERN from '../../constants/numberInputPattern'
import './ExchangeCard.css'
import { getCurrencySign } from '../../util/getCurrencySign'

type Props = {
  isMain: boolean
  currencyValues: InputState
  setCurrencyValues: (value: InputState) => void
  wallets: WalletsState
}

const ExchangeCard: FC<Props> = ({ isMain, currencyValues, setCurrencyValues, wallets }) => {

  const { state, dispatch, rate } = useContext(CurrencyDataContext)

  const cardCurrency = useMemo(
    () => isMain ? state.mainCurrency : state.dependentCurrency,
    [isMain, state.mainCurrency, state.dependentCurrency]
  )
  const actionType = isMain ? SET_MAIN_CURRENCY : SET_DEPENDENT_CURRENCY
  const handleDropdownChange = useCallback(
    (e: SyntheticEvent<HTMLElement, Event>, data: DropdownProps ) =>  {
      setCurrencyValues({
        main: '',
        dependent: '',
      })
      dispatch({ type: actionType, payload: data.value as CURRENCIES })
    },
    [dispatch, setCurrencyValues, actionType]
  )

  const inputValue = isMain ? currencyValues.main : currencyValues.dependent
  const handleInputChange = useCallback(
    (e: SyntheticEvent<HTMLElement, Event>, data: InputProps) => {
      const match = data.value.match(NUMBER_INPUT_PATTERN);
  
      if (!match) {
        return
      }
  
      if (isMain) {
        setCurrencyValues({
          main: data.value,
          dependent: ((Number(data.value) * rate).toFixed(2)),
        })
      } else {
        setCurrencyValues({
          main: (Number(data.value) / rate).toFixed(2),
          dependent: data.value,
        })
      }
    },
    [isMain, setCurrencyValues, rate]
  )

  const balanceString = useMemo(
    () => `
      Balance: 
      ${getCurrencySign(cardCurrency)}
      ${(isMain ? wallets[state.mainCurrency] : wallets[state.dependentCurrency]).toFixed(2)}
    `,
    [cardCurrency, state.mainCurrency, state.dependentCurrency, wallets, isMain]
  )

  return (
    <Card>
      <Card.Content >
        <div className="card-controls">
          <div>
            <Dropdown
              inline
              search
              options={currenciesData}
              value={cardCurrency}
              onChange={handleDropdownChange}
            />
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
        </div>
        <Card.Meta content={balanceString} />
      </Card.Content>
    </Card>
  )
}

export default ExchangeCard
