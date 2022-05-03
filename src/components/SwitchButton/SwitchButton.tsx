import { Divider, Button } from 'semantic-ui-react'
import { useCallback, useContext } from 'react'

import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { SWITCH_BUY_MODE } from '../../reducers/currencyDataReducer/actions'

const SwitchButton: React.FC = () => {

  const { state, dispatch } = useContext(CurrencyDataContext)
  

  const onArrowClick = useCallback(
    () => dispatch({ type: SWITCH_BUY_MODE, payload: !state.isBuyMode }),
    [dispatch, state.isBuyMode]
  )

  return (
    <Divider horizontal fitted clearing>
      <div>
        <Button onClick={onArrowClick} basic circular icon={ state.isBuyMode ? 'arrow down' : 'arrow up' } size='mini'/> 
      </div>
    </Divider>
  )
}

export default SwitchButton
