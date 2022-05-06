import { FC } from 'react'

import CurrencyDataProvider from './contexts/CurrencyDataContext/CurrencyDataContext'
import ExchangeWidget from './modules/ExchangeWidget'
import './App.css'
import WalletsProvider from './contexts/WalletsContext/WalletsContext'

const App: FC = () => {

  return (
    <div className="app">
      <CurrencyDataProvider>
        <WalletsProvider>
          <ExchangeWidget/>
        </WalletsProvider>
      </CurrencyDataProvider>
    </div>
  )
}

export default App
