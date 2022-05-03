import './App.css';
import { Card } from 'semantic-ui-react'

import ExchangCard from './components/ExchangCard'
import Header from './components/Header';
import Rate from './components/Rate';
import SwitchButton from './components/SwitchButton';
import CurrencyDataProvider from './contexts/CurrencyDataContext/CurrencyDataContext';

const App: React.FC = () => {
  return (
    <div className="app">
      <CurrencyDataProvider>
        <Card className="container">
          <Header/>
          <Rate/>
          <ExchangCard/>
          <SwitchButton/>
          <ExchangCard/>
        </Card>
      </CurrencyDataProvider>
    </div>
  );
}

export default App;
