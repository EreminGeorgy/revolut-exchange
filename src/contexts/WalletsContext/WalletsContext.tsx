import { createContext, useState, FC, ReactNode, useCallback } from 'react'

import { CURRENCIES } from '../../constants/currencies'
import { WalletsState } from '../../components/types'


type Props = {
  children: ReactNode
}

type Transaction = {
  currency: CURRENCIES
  amount: number
}

type Exchange = {
  sell: Transaction
  buy: Transaction
}

const initialState: WalletsState = {
  [CURRENCIES.EUR]: 1000,
  [CURRENCIES.USD]: 1000,
  [CURRENCIES.GBP]: 1000,
}

export const WalletsContext = createContext<{
  wallets: WalletsState
  updateWallets: (exchange: Exchange) => void}>({
    wallets: initialState,
    updateWallets: () => null,
  })

const WalletsProvider: FC<Props> = ({ children }) => {

  const [wallets, setWallets] = useState(initialState)

  const updateWallets = useCallback(
    (exchange: Exchange) => {      
      setWallets(prevState => {
        return {
          ...prevState,
          [exchange.buy.currency]: prevState[exchange.buy.currency] + exchange.buy.amount,
          [exchange.sell.currency]: prevState[exchange.sell.currency] - exchange.sell.amount,
        }
      })
    },
    [setWallets],
  )

  return (
    <WalletsContext.Provider
      value={{ 
        wallets,
        updateWallets,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

export default WalletsProvider