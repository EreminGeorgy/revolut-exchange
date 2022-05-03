import { useContext } from 'react'

import { DICTIONARY } from '../../constants/dictionary'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import DangerousHtml from '../DangerousHtml'

const Header: React.FC = () => {
  const { state } = useContext(CurrencyDataContext)

  return (
    <DangerousHtml as="h1">
      {`${state.isBuyMode ? DICTIONARY.buy : DICTIONARY.sell} ${state.mainCurrency}`}
    </DangerousHtml>
  )
}

export default Header
