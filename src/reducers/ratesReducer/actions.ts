import { CURRENCIES } from "../../constants/currencies"

export const LOADING = 'LOADING'
export const FETCHED = 'FETCHED'
export const ERROR = 'ERROR'

export type CurrencyData = {
    base: CURRENCIES,
    disclamer: string,
    license: string,
    rates: {
      [key:string]: number,
    },
    timestamp: number,
  }

export type FetchAction = {
    type: 'LOADING'
} | {
    type: 'FETCHED',
    payload: CurrencyData,
} | {
    type: 'ERROR',
    payload: Error,
}