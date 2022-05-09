import { FetchState, reducer, initialState } from "./reducer"
import { LOADING, FETCHED, ERROR } from './actions'

test('returns initial state', () => {
  expect(reducer({} as FetchState, {} as any)).toEqual({})
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
    payload: {foo: 'bar'}
  })).toEqual({
    error: undefined,
    data: {foo: 'bar'},
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