import { Card } from 'semantic-ui-react'
import { FC } from 'react'

import Header from '../components/Header'
import Rate from '../components/Rate'
import ExchangeField from '../components/ExchangeField'

const ExchangeWidget: FC = () => {

  return (
    <Card className="container">
      <Header/>
      <Rate/>
      <ExchangeField/>
    </Card>
  )
}

export default ExchangeWidget
