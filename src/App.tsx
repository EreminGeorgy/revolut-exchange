import { FC } from 'react'

import CurrencyDataProvider from './contexts/CurrencyDataContext/CurrencyDataContext'
import ExchangeWidget from './modules/ExchangeWidget'
import './App.css'

const App: FC = () => {

  return (
    <div className="app">
      <CurrencyDataProvider>
        <ExchangeWidget/>
      </CurrencyDataProvider>
    </div>
  )
}

export default App
