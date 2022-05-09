import { useContext, FC, memo } from 'react'

import { DICTIONARY } from '../../constants/dictionary'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import DangerousHtml from '../DangerousHtml'
import { StringMap } from '../types'

const Header: FC = () => {
  const { state } = useContext(CurrencyDataContext)

  return (
    <DangerousHtml type="h1" data-testid="header">
      {`${state.isBuyMode ? DICTIONARY.buy : DICTIONARY.sell} ${(DICTIONARY as StringMap)[state.mainCurrency]}`}
    </DangerousHtml>
  )
}

export default memo(Header)
