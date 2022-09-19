import './App.scss';
import AlertsContainer from './Components/AlertsContainer';
import Calendar from './Components/Calendar';
import CountryContainer from './Components/CountryContainer';
import Header from './Components/Header';
import SubscriptionContainer from './Components/iCalSubscription/SubscriptionContainer'

function App() {
  return (
    <div className='main-container'>
      <Header />
      <CountryContainer />
      <Calendar />
      <AlertsContainer />
      <SubscriptionContainer />
    </div>
  );
}

export default App;
