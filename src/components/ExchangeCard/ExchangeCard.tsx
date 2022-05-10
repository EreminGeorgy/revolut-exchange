import { Card, Dropdown, Label } from 'semantic-ui-react'
import { DropdownProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import { useContext, FC, SyntheticEvent, useCallback, useMemo } from 'react'

import { CURRENCIES, currenciesData } from '../../constants/currencies'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { SET_MAIN_CURRENCY, SET_DEPENDENT_CURRENCY } from '../../reducers/currencyDataReducer/actions'
import { InputState, WalletsState } from '../types'
import { formatCurrencyString } from '../../util/formatCurrencyString'
import { DICTIONARY } from '../../constants/dictionary'
import CurrencyInput from '../CurrencyInput'
import { getComputedCurrency } from '../../util/getComputedCurrency'

import './ExchangeCard.css'



type Props = {
  isMain: boolean
  currencyValues: InputState
  setCurrencyValues: (value: InputState) => void
  wallets: WalletsState
  errorMessage: boolean
}

const ExchangeCard: FC<Props> = ({ isMain, currencyValues, setCurrencyValues, wallets, errorMessage }) => {

  const { state, dispatch, rate } = useContext(CurrencyDataContext)

  const cardCurrency = useMemo(
    () => isMain ? state.mainCurrency : state.dependentCurrency,
    [isMain, state.mainCurrency, state.dependentCurrency]
  )

  const isSelling = useMemo(
    () => isMain !== state.isBuyMode,
    [isMain, state.isBuyMode]
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

  const handleInputChange = useCallback(
    (value: string) => {
      if (isMain) {
        setCurrencyValues({
          main: value,
          dependent: getComputedCurrency(value, rate, true),
        })
      } else {
        setCurrencyValues({
          main: getComputedCurrency(value, rate, false),
          dependent: value,
        })
      }
    },
    [isMain, setCurrencyValues, rate]
  )

  const balanceString = useMemo(
    () => {
      const currencyValue = isMain ? wallets[state.mainCurrency] : wallets[state.dependentCurrency]
      return `
        ${DICTIONARY.balance}
        ${formatCurrencyString(currencyValue.toFixed(2), cardCurrency)}
      `
    }
    ,
    [cardCurrency, state.mainCurrency, state.dependentCurrency, wallets, isMain]
  )

  formatCurrencyString('1', cardCurrency)

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
              data-testid={`${isMain ? 'currency-selector-main' : 'currency-selector-secondary'}`}
            />
          </div>
          <div>
            <CurrencyInput
              value={isMain ? currencyValues.main : currencyValues.dependent}
              handleInputChange={handleInputChange}
              testId={`${isMain ? 'currency-input-main' : ''}`}
            />
          </div>
        </div>
        <div>
          <Card.Meta content={balanceString} data-testid={`${isMain ? 'main-wallet' : ''}`}/>
          {errorMessage && isSelling && 
            <Label basic color='red' data-testid={`${isMain ? 'error-label-main' : ''}`}>
              {DICTIONARY.exeedsBallance}
            </Label>
          }
        </div>
      </Card.Content>
    </Card>
  )
}

export default ExchangeCard
