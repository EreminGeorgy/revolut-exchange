import React from 'react'
import { Card, Dropdown } from 'semantic-ui-react'
import { currencies } from '../../constants/currencies'

const ExchangeCard: React.FC = () => {
  return (
    <Card>
      <Card.Content>
      <Dropdown
        inline
        search
        options={currencies}
        defaultValue={currencies[0].value}
      />
        <Card.Meta content='Musicians' />
        <Card.Description content='Jake is a drummer living in New York.' />
      </Card.Content>
    </Card>
  )
}

export default ExchangeCard
