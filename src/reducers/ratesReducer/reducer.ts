import { CURRENCIES } from '../../constants/currencies'

import { 
  LOADING,
  FETCHED,
  ERROR,
  FetchAction,
} from './actions'

type CurrencyData = {
  base: CURRENCIES,
  disclamer: string,
  license: string,
  rates: {
    [key:string]: number,
  },
  timestamp: number,
}

export interface FetchState {
  data?: CurrencyData | null
  error?: Error | undefined
  isFetching: boolean
}

export const initialState: FetchState = {
  error: undefined,
  data: null,
  isFetching: false
}

export const reducer = (state: FetchState, action: FetchAction): FetchState => {
  switch (action.type) {
  case LOADING:
    return { 
      ...state,
      isFetching: true,
    }
  case FETCHED:
    return { 
      ...state,
      isFetching: false,
      data: action.payload,
    }
  case ERROR:
    return { 
      ...state,
      isFetching: false,
      error: action.payload,
    }
  default:
    return state
  }
}