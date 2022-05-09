import { CURRENCIES } from "../../constants/currencies"
import { WalletsState } from '../../components/types'

import { 
  UPDATE_WALLETS,
  WalletsAction,
} from './actions'

export const initialState: WalletsState = {
  [CURRENCIES.EUR]: 1000,
  [CURRENCIES.USD]: 1000,
  [CURRENCIES.GBP]: 1000,
}

export const reducer = (state: WalletsState, action: WalletsAction) => {
  switch (action.type) {
    
  case UPDATE_WALLETS:
    const exchange = action.payload
    return {
      ...state,
      [exchange.buy.currency]: state[exchange.buy.currency] + exchange.buy.amount,
      [exchange.sell.currency]: state[exchange.sell.currency] - exchange.sell.amount,
    }
  default:
    return state
  }
}