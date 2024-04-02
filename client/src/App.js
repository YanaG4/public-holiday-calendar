import React from 'react';
import AlertsContainer from './Components/Alerts/AlertsContainer';
import Calendar from './Components/Calendar/Calendar';
import CountryContainer from './Components/CountryInput/CountryContainer';
import Footer from './Components/Footer/Footer';
import Header from './Components/Hedaer/Header';
import SubscriptionContainer from './Components/iCalSubscription/SubscriptionContainer'
import { CountryProvider } from './CountryContext';

import './App.scss';

function App() {

  return (
    <div className='main-container'>
      <Header />
      <CountryProvider>
        <CountryContainer />
        <Calendar />
        <AlertsContainer />
        <SubscriptionContainer />
      </CountryProvider>
      <Footer />
    </div>
  );
}

export default App;
