import './App.scss';
import React, { useState, useEffect } from 'react';
import AlertsContainer from './Components/AlertsContainer';
import Calendar from './Components/Calendar';
import CountryContainer from './Components/CountryContainer';
import Footer from './Components/Footer';
import Header from './Components/Header';
import SubscriptionContainer from './Components/iCalSubscription/SubscriptionContainer'

function App() {
  const [chosenCountries, setChosenCountries] = useState([])


  useEffect(() => {
    console.log(chosenCountries);
  }, [chosenCountries])

  function setCountriesHandler(countries) {
    setChosenCountries(countries)
  }

  return (
    <div className='main-container'>
      <Header />
      <CountryContainer
        setCountries={setCountriesHandler}
      />
      <Calendar
        countries={chosenCountries} />
      <AlertsContainer
        countries={chosenCountries} />
      <SubscriptionContainer />
      <Footer />
    </div>
  );
}

export default App;
