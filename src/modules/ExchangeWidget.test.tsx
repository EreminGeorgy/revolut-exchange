import { render, fireEvent } from '@testing-library/react'

import { CurrencyDataContext } from '../contexts/CurrencyDataContext/CurrencyDataContext'
import { WalletsContext } from '../contexts/WalletsContext/WalletsContext'
import { initialState } from '../reducers/currencyDataReducer/reducer'
import { CURRENCIES } from '../constants/currencies'


import ExchangeWidget from './ExchangeWidget'

test('matches its snapshot', () => {
  const component = render(<ExchangeWidget/>)
  expect(component).toMatchSnapshot()
})

test('transactions and modal works', () => {
  const { getByTestId } = render(
    <CurrencyDataContext.Provider 
      value={{
        state: initialState,
        dispatch: () => null,
        rate: 2,
        error: undefined,
        isFetching: false
      }}
    >
      <WalletsContext.Provider
        value={{
          wallets: {
            [CURRENCIES.EUR]: 1000,
            [CURRENCIES.USD]: 1000,
            [CURRENCIES.GBP]: 1000,
          },
          dispatch: () => void null,
        }}
      >
        <ExchangeWidget/>
      </WalletsContext.Provider>
    </CurrencyDataContext.Provider>
  )
  const mainInput = getByTestId("currency-input-main").children[0]
  const submit = getByTestId("submit")

  fireEvent.change(mainInput, { target: { value: '100' } })
  fireEvent.click(submit)

  const modalDescription = getByTestId("modal-description")
  expect(modalDescription).toHaveTextContent('You exchanged £100.00 for $200.00')
})