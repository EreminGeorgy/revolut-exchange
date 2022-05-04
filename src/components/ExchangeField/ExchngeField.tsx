import { FC, useState } from 'react'

import ExchangCard from './ExchangeCard'
import SwitchButton from './SwitchButton'
import { InputState } from './types'

const ExchangeWidget: FC = () => {

  const [currencyValues, setCurrencyValues] = useState<InputState>({
    main: '',
    dependent: '',
  })

  return (
    <>
      <ExchangCard 
        isMain={true}
        currencyValues={currencyValues}
        setCurrencyValues={setCurrencyValues}
      />
      <SwitchButton/>
      <ExchangCard 
        isMain={false}
        currencyValues={currencyValues}
        setCurrencyValues={setCurrencyValues}
      />
    </>
  )
}

export default ExchangeWidget