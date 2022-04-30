import './styles/index.css';
import { Card, Divider } from 'semantic-ui-react'
import ExchangCard from './components/ExchangCard'

const App: React.FC = () => {
  return (
    <div className="app">
      <Card>
        <ExchangCard/>
        <Divider horizontal fitted clearing>Or</Divider>
        <ExchangCard/>
      </Card>
    </div>
  );
}

export default App;
