import { CURRENCIES } from "../../constants/currencies"

import { 
  SET_MAIN_CURRENCY,
  SET_DEPENDENT_CURRENCY,
  SWITCH_BUY_MODE,
  CurrencyAction,
} from './actions'

export type CurrencyState = {
  mainCurrency: string,
  dependentCurrency: string,
  isBuyMode: boolean,
}

export const initialState: CurrencyState = {
  mainCurrency: CURRENCIES.GBP,
  dependentCurrency: CURRENCIES.USD,
  isBuyMode: false,
}

export const reducer = (state: CurrencyState, action: CurrencyAction) => {
  switch (action.type) {
    
  case SET_MAIN_CURRENCY:
    return {
      ...state,
      mainCurrency: action.payload,
    }
  case SET_DEPENDENT_CURRENCY:
    return {
      ...state,
      dependentCurrency: action.payload,
    }
  case SWITCH_BUY_MODE:
    return {
      ...state,
      isBuyMode: action.payload,
    }
  default:
    return state
  }
}