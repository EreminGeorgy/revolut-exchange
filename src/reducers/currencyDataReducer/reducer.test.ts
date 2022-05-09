import { CURRENCIES } from "../../constants/currencies"

import { CurrencyState, reducer, initialState } from "./reducer"
import { SET_MAIN_CURRENCY, SET_DEPENDENT_CURRENCY, SWITCH_BUY_MODE } from './actions'

test('returns initial state', () => {
  expect(reducer({} as CurrencyState, {} as any)).toEqual({})
})

test('handles the SET_MAIN_CURRENCY action', () => {
  expect(reducer(initialState, { type: SET_MAIN_CURRENCY, payload: CURRENCIES.EUR })).toEqual({
    mainCurrency: CURRENCIES.EUR,
    dependentCurrency: CURRENCIES.USD,
    isBuyMode: false,
  })
})

test('handles the SET_DEPENDENT_CURRENCY action', () => {
  expect(reducer(initialState, { type: SET_DEPENDENT_CURRENCY, payload: CURRENCIES.EUR })).toEqual({
    mainCurrency: CURRENCIES.GBP,
    dependentCurrency: CURRENCIES.EUR,
    isBuyMode: false,
  })
})

test('handles the SWITCH_BUY_MODE action', () => {
  expect(reducer(initialState, { type: SWITCH_BUY_MODE, payload: true })).toEqual({
    mainCurrency: CURRENCIES.GBP,
    dependentCurrency: CURRENCIES.USD,
    isBuyMode: true,
  })
})