import { Button } from 'semantic-ui-react'
import { useCallback, useContext, FC } from 'react'

import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { SWITCH_BUY_MODE } from '../../reducers/currencyDataReducer/actions'
import { WalletsState } from '../types'

type Props = {
  onClick: () => void
}

const SubmitButton: FC<Props> = ({ onClick }) => {

  const { state, dispatch } = useContext(CurrencyDataContext)
  

  const onArrowClick = useCallback(
    () => dispatch({ type: SWITCH_BUY_MODE, payload: !state.isBuyMode }),
    [dispatch, state.isBuyMode]
  )

  return ( 
    <Button onClick={onClick} fluid/> 
  )
}

export default SubmitButton
