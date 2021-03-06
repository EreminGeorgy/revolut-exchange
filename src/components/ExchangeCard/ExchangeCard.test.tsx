import { render } from '@testing-library/react'

import { CURRENCIES } from '../../constants/currencies'

import ExchangeCard from './ExchangeCard'

test('matches its snapshot', () => {
  const component = render(<ExchangeCard
    isMain={true}
    currencyValues={{ 
      main: '1',
      dependent: '0',
    }}
    setCurrencyValues={() => null}
    wallets = {{
      [CURRENCIES.EUR]: 1000,
      [CURRENCIES.USD]: 100,
      [CURRENCIES.GBP]: 10,
    }}
    errorMessage={true}
  />)
  expect(component).toMatchSnapshot()
})