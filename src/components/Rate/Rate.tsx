import { Label, Icon } from 'semantic-ui-react'
import { useContext, useMemo, FC } from 'react'

import DangerousHtml from '../DangerousHtml'
import { CurrencyDataContext } from '../../contexts/CurrencyDataContext'
import { formatCurrencyString } from '../../util/formatCurrencyString'

const Rate: FC = () => {

  const { state, rate } = useContext(CurrencyDataContext)

  const { mainCurrency, dependentCurrency } = state

  const computedRatesString = useMemo(
    () => `${formatCurrencyString('1', mainCurrency)} = ${formatCurrencyString(rate.toFixed(2), dependentCurrency)}`,
    [mainCurrency, dependentCurrency, rate]
  )

  return (
    <div>
      <Label>    
        <Icon name='chart line'/>
        <DangerousHtml type="span">{computedRatesString}</DangerousHtml>
      </Label>
    </div>
  )
}

export default Rate
