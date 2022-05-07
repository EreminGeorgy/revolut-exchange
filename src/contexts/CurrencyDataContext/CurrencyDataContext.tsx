import { createContext, useReducer, FC, ReactNode, Dispatch, useMemo} from 'react'

import { CurrencyAction } from '../../reducers/currencyDataReducer/actions'
import { CurrencyState, initialState, reducer } from '../../reducers/currencyDataReducer/reducer'
import useRates from '../../hooks/useRates'


type Props = {
  children: ReactNode
}

export const CurrencyDataContext = createContext<{
  state: CurrencyState
  dispatch: Dispatch<CurrencyAction>
  rate: number,
  error: Error | undefined
  isFetching: boolean
}>({
  state: initialState,
  dispatch: () => null,
  rate: 0,
  error: undefined,
  isFetching: false
})

const CurrencyDataProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { data, error, isFetching } = useRates()

  const rate = useMemo(
    () => { 
      const dependentCurrencyRate = data?.rates[state.dependentCurrency]
      const mainCurrencyRate = data?.rates[state.mainCurrency]
      if (!mainCurrencyRate || !dependentCurrencyRate) {
        return 0
      }
      return dependentCurrencyRate / mainCurrencyRate
    },
    [state, data]
  )

  return (
    <CurrencyDataContext.Provider
      value={{ 
        state,
        dispatch,
        rate,
        error,
        isFetching,
      }}
    >
      {children}
    </CurrencyDataContext.Provider>
  )
}

export default CurrencyDataProvider