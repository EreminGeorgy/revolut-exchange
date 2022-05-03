import { Card, Dropdown, Input } from 'semantic-ui-react'

import { currenciesData } from '../../constants/currencies'
import './ExchangeCard.css'

const ExchangeCard: React.FC = () => {
  return (
    <Card>
      <Card.Content className="card-content">
        <div>
          <Dropdown
            inline
            search
            options={currenciesData}
            defaultValue={currenciesData[0].value}
          />
          <Card.Meta content='Musicians' />
        </div>
        <div>
          <Input transparent placeholder='0' className="currency-input" size='large'/>
        </div>
      </Card.Content>
    </Card>
  )
}

export default ExchangeCard
