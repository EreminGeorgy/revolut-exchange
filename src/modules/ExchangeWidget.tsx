import { Card } from 'semantic-ui-react'
import { FC, useCallback, useContext, useState, useMemo } from 'react'

import { WalletsContext } from '../contexts/WalletsContext'
import { CurrencyDataContext } from '../contexts/CurrencyDataContext'
import Header from '../components/Header'
import Rate from '../components/Rate'
import ExchangeCard from '../components/ExchangeCard'
import SwitchButton from '../components/SwitchButton'
import { InputState } from '../components/types'
import SubmitButton from '../components/SubmitButton'
import { CURRENCIES } from '../constants/currencies'
import { UPDATE_WALLETS } from '../reducers/walletsReducer/actions'
import { DICTIONARY } from '../constants/dictionary'

const ExchangeWidget: FC = () => {

  const { wallets, dispatch } = useContext(WalletsContext)
  const { state, error, isFetching} = useContext(CurrencyDataContext)

  const [currencyValues, setCurrencyValues] = useState<InputState>({
    main: '',
    dependent: '',
  })

  const isError = useMemo(
    () => !state.isBuyMode && (wallets[state.mainCurrency] - Number(currencyValues.main) < 0)
      || state.isBuyMode && (wallets[state.dependentCurrency] - Number(currencyValues.dependent) < 0),
    [currencyValues, state, wallets]
  )

  const isSameCurrency = useMemo(
    () => state.mainCurrency === state.dependentCurrency,
    [state.mainCurrency, state.dependentCurrency]
  )

  const zeroExchangeCase = useMemo(
    () => !(Number(currencyValues.main) || Number(currencyValues.dependent)),
    [currencyValues]
  )

  const chooseValue = useCallback(
    (first: string , second: string): string => state.isBuyMode ? first : second,
    [state.isBuyMode]
  )

  const submitHandler = useCallback(
    () => {
      dispatch({ type: UPDATE_WALLETS, payload: {
        buy:{
          currency: chooseValue(state.mainCurrency, state.dependentCurrency) as CURRENCIES,
          amount: Number(chooseValue(currencyValues.main, currencyValues.dependent)),
        },
        sell:{
          currency: chooseValue(state.dependentCurrency, state.mainCurrency) as CURRENCIES,
          amount: Number(chooseValue(currencyValues.dependent, currencyValues.main)),
        },
      }}
      )
    },
    [dispatch, currencyValues, chooseValue, state]
  )

  const errorText = useMemo(
    () => {
      let message = null

      if (isSameCurrency) {
        message = DICTIONARY.sameCurrency
      }

      if (!!error || isError) {
        message = DICTIONARY.error
      }

      if (zeroExchangeCase) {
        message = DICTIONARY.insufficientFunds
      }

      return message
    },
    [isSameCurrency, error, isError, zeroExchangeCase]
  )

  return (
    <Card className="container">
      <Header />
      <Rate data-testid="rate"/>
      <ExchangeCard 
        isMain={true}
        currencyValues={currencyValues}
        setCurrencyValues={setCurrencyValues}
        wallets={wallets}
        errorMessage={isError}
        data-testid="exchange-card-main"
      />
      <SwitchButton/>
      <ExchangeCard 
        isMain={false}
        currencyValues={currencyValues}
        setCurrencyValues={setCurrencyValues}
        wallets={wallets}
        errorMessage ={isError}
        data-testid="exchange-card-secondary"
      />
      <SubmitButton 
        disabled={!!error || isFetching || isSameCurrency || isError || zeroExchangeCase} 
        onClick={submitHandler} 
        currencyValues={currencyValues}
        setCurrencyValues={setCurrencyValues}
        errorText={errorText}
      />
    </Card>
  )
}

export default ExchangeWidget
