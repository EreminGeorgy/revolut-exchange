import { CURRENCIES } from "../../constants/currencies"

export const SET_MAIN_CURRENCY = 'SET_MAIN_CURRENCY'
export const SET_DEPENDENT_CURRENCY = 'SET_DEPENDENT_CURRENCY'
export const SWITCH_BUY_MODE = 'SWITCH_BUY_MODE'

export type CurrencyAction = {
    type: 'SET_MAIN_CURRENCY',
    payload: CURRENCIES,
} | {
    type: 'SET_DEPENDENT_CURRENCY',
    payload: CURRENCIES,
} | {
    type: 'SWITCH_BUY_MODE',
    payload: boolean,
}