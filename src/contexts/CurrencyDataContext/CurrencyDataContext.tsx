import { createContext, useReducer, FC, ReactNode, Dispatch} from 'react'

import { CurrencyAction } from '../../reducers/currencyDataReducer/actions'
import { CurrencyState, initialState, reducer } from '../../reducers/currencyDataReducer/reducer'

type Props = {
  children: ReactNode
}

export const CurrencyDataContext = createContext<{
  state: CurrencyState
  dispatch: Dispatch<CurrencyAction>
}>({
  state: initialState,
  dispatch: () => null
})

const CurrencyDataProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CurrencyDataContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </CurrencyDataContext.Provider>
  )
}

export default CurrencyDataProvider
