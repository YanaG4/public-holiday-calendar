import './App.scss';
import React from 'react';
import AlertsContainer from './Components/AlertsContainer';
import Calendar from './Components/Calendar';
import CountryContainer from './Components/CountryContainer';
import Footer from './Components/Footer';
import Header from './Components/Header';
import SubscriptionContainer from './Components/iCalSubscription/SubscriptionContainer'
import { CountryProvider } from './CountryContext'

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
