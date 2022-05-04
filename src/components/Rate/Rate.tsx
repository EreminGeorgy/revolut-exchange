import { Label, Icon } from 'semantic-ui-react'
import { useContext, useMemo } from 'react'

import DangerousHtml from '../DangerousHtml'
import { getCurrencySign } from '../../util/getCurrencySign'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'

const Rate: React.FC = () => {

  const { state, rate } = useContext(CurrencyDataContext)

  const { mainCurrency, dependentCurrency } = state

  const computedRatesString = useMemo(
    () => `${getCurrencySign(mainCurrency)}1 = ${getCurrencySign(dependentCurrency)}${rate.toFixed(2)}`,
    [mainCurrency, dependentCurrency, rate]
  )

  return (
    <div>
      <Label>    
        <Icon name='chart line'/>
        <DangerousHtml as="span">{computedRatesString}</DangerousHtml>
      </Label>
    </div>
  )
}

export default Rate
