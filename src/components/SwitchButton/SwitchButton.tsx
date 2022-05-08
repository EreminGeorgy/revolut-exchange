import { Divider, Button } from 'semantic-ui-react'
import { useCallback, useContext, FC } from 'react'

import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { SWITCH_BUY_MODE } from '../../reducers/currencyDataReducer/actions'

const SwitchButton: FC = () => {

  const { state, dispatch } = useContext(CurrencyDataContext)
  

  const onArrowClick = useCallback(
    () => dispatch({ type: SWITCH_BUY_MODE, payload: !state.isBuyMode }),
    [dispatch, state.isBuyMode]
  )

  return (
    <Divider horizontal fitted clearing>
      <div>
        <Button 
          onClick={onArrowClick}
          basic
          circular
          icon={ state.isBuyMode ? 'arrow up' : 'arrow down' } size='mini'
          data-testid="switch-button" 
        /> 
      </div>
    </Divider>
  )
}

export default SwitchButton
