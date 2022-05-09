import { CURRENCIES } from "../../constants/currencies"
import { WalletsState } from "../../components/types"

import { reducer, initialState } from "./reducer"
import { UPDATE_WALLETS } from './actions'

test('returns initial state', () => {
  expect(reducer({} as WalletsState, {} as any)).toEqual({})
})

test('handles the SET_MAIN_CURRENCY action', () => {
  expect(reducer(initialState, { type: UPDATE_WALLETS, payload: {
    buy:{
      currency: CURRENCIES.EUR,
      amount: 1000,
    },
    sell:{
      currency: CURRENCIES.GBP,
      amount: 501,
    },
  }})).toEqual({
    [CURRENCIES.EUR]: 2000,
    [CURRENCIES.USD]: 1000,
    [CURRENCIES.GBP]: 499,
  })
})
