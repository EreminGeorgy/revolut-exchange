import { createContext, FC, ReactNode, useReducer, Dispatch } from 'react'

import { WalletsState } from '../../components/types'
import { initialState, reducer } from '../../reducers/walletsReducer/reducer'
import { WalletsAction } from '../../reducers/walletsReducer/actions'

type Props = {
  children: ReactNode
}

export const WalletsContext = createContext<{
  wallets: WalletsState
  dispatch: Dispatch<WalletsAction>
}>({
  wallets: initialState,
  dispatch: () => void null,
})

const WalletsProvider: FC<Props> = ({ children }) => {

  const [wallets, dispatch] = useReducer(reducer, initialState)

  return (
    <WalletsContext.Provider
      value={{ 
        wallets,
        dispatch,
      }}
    >
      {children}
    </WalletsContext.Provider>
  )
}

export default WalletsProvider