import './App.css'

import CurrencyDataProvider from './contexts/CurrencyDataContext/CurrencyDataContext'
import ExchangeWidget from './modules/ExchangeWidget'

const App: React.FC = () => {

  return (
    <div className="app">
      <CurrencyDataProvider>
        <ExchangeWidget/>
      </CurrencyDataProvider>
    </div>
  )
}

export default App
