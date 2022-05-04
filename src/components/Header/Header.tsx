import { useContext } from 'react'

import { DICTIONARY } from '../../constants/dictionary'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import DangerousHtml from '../DangerousHtml'

interface StringMap {
  [key: string]: string
}

const Header: React.FC = () => {
  const { state } = useContext(CurrencyDataContext)

  return (
    <DangerousHtml as="h1">
      {`${state.isBuyMode ? DICTIONARY.buy : DICTIONARY.sell} ${(DICTIONARY as StringMap)[state.mainCurrency]}`}
    </DangerousHtml>
  )
}

export default Header
