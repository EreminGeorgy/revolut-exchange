import { Card } from 'semantic-ui-react'
import { FC } from 'react'

import ExchangCard from '../components/ExchangCard'
import Header from '../components/Header'
import Rate from '../components/Rate'
import SwitchButton from '../components/SwitchButton'

const ExchangeWidget: FC = () => {

  return (
    <Card className="container">
      <Header/>
      <Rate/>
      <ExchangCard/>
      <SwitchButton/>
      <ExchangCard/>
    </Card>
  )
}

export default ExchangeWidget
