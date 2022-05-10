import { CURRENCIES } from "../../constants/currencies"

import { FetchState, reducer, initialState } from "./reducer"
import { LOADING, FETCHED, ERROR, FetchAction } from './actions'


test('returns initial state', () => {
  expect(reducer({} as FetchState, {} as FetchAction)).toEqual({})
})

test('handles the LOADING action', () => {
  expect(reducer(initialState, { type: LOADING})).toEqual({
    error: undefined,
    data: null,
    isFetching: true
  })
})

test('handles the FETCHED action', () => {
  expect(reducer(initialState, {
    type: FETCHED,
    payload: {
      base: CURRENCIES.EUR,
      disclamer: 'foo',
      license: 'bar',
      rates: {
        [CURRENCIES.EUR]: 1,
        [CURRENCIES.USD]: 1.12,
        [CURRENCIES.GBP]: 1.25,
      },
      timestamp: 1
    }
  })).toEqual({
    error: undefined,
    data: {
      base: CURRENCIES.EUR,
      disclamer: 'foo',
      license: 'bar',
      rates: {
        [CURRENCIES.EUR]: 1,
        [CURRENCIES.USD]: 1.12,
        [CURRENCIES.GBP]: 1.25,
      },
      timestamp: 1
    },
    isFetching: false
  })
})

test('handles the ERROR action', () => {
  expect(reducer(initialState, {
    type: ERROR,
    payload: new Error
  })).toEqual({
    error: new Error,
    data: null,
    isFetching: false
  })
})