import { Card } from 'semantic-ui-react'
import { FC, useCallback, useContext, useState, useEffect, useMemo } from 'react'

import { WalletsContext } from '../contexts/WalletsContext'
import { CurrencyDataContext } from '../contexts/CurrencyDataContext'
import Header from '../components/Header'
import Rate from '../components/Rate'
import ExchangeCard from '../components/ExchangeCard'
import SwitchButton from '../components/SwitchButton'
import { InputState } from '../components/types'
import SubmitButton from '../components/SubmitButton'
import { CURRENCIES } from '../constants/currencies'

const ExchangeWidget: FC = () => {

  const { wallets, updateWallets } = useContext(WalletsContext)
  const { state, error, isFetching} = useContext(CurrencyDataContext)

  const [currencyValues, setCurrencyValues] = useState<InputState>({
    main: '',
    dependent: '',
  })

  const errorCase = useMemo(
    () => !state.isBuyMode && (wallets[state.mainCurrency] - Number(currencyValues.main) < 0)
      || state.isBuyMode && (wallets[state.dependentCurrency] - Number(currencyValues.dependent) < 0),
    [currencyValues, state, wallets]
  )

  const equalSelectorsCase = useMemo(
    () => state.mainCurrency === state.dependentCurrency,
    [state.mainCurrency, state.dependentCurrency]
  )

  const chooseValue = useCallback(
    (first: string , second: string): string => state.isBuyMode ? first : second,
    [state.isBuyMode]
  )

  const submitHandler = useCallback(
    () => {
      updateWallets({
        buy:{
          currency: chooseValue(state.mainCurrency, state.dependentCurrency) as CURRENCIES,
          amount: Number(chooseValue(currencyValues.main, currencyValues.dependent)),
        },
        sell:{
          currency: chooseValue(state.dependentCurrency, state.mainCurrency) as CURRENCIES,
          amount: Number(chooseValue(currencyValues.dependent, currencyValues.main)),
        },
      })
    },
    [updateWallets, state, currencyValues, chooseValue]
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
        errorMessage={errorCase}
        data-testid="exchange-card-main"
      />
      <SwitchButton/>
      <ExchangeCard 
        isMain={false}
        currencyValues={currencyValues}
        setCurrencyValues={setCurrencyValues}
        wallets={wallets}
        errorMessage ={errorCase}
        data-testid="exchange-card-secondary"
      />
      <SubmitButton 
        disabled={!!error || isFetching || equalSelectorsCase || errorCase} 
        onClick={submitHandler} 
        currencyValues={currencyValues}
      />
    </Card>
  )
}

export default ExchangeWidget
