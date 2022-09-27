import './App.scss';
import React, { useState, useEffect } from 'react';
import AlertsContainer from './Components/AlertsContainer';
import Calendar from './Components/Calendar';
import CountryContainer from './Components/CountryContainer';
import Footer from './Components/Footer';
import Header from './Components/Header';
import SubscriptionContainer from './Components/iCalSubscription/SubscriptionContainer'

function App() {
  const [chosenCountries, setChosenCountries] = useState(() => {
    const savedCountries = JSON.parse(localStorage.getItem('chosenCountries'))
    return savedCountries || []
  })


  useEffect(() => {
    localStorage.setItem("chosenCountries", JSON.stringify(chosenCountries))
  }, [chosenCountries])

  function setCountriesHandler(countries) {
    setChosenCountries(countries)
  }

  return (
    <div className='main-container'>
      <Header />
      <CountryContainer
        setCountries={setCountriesHandler}
        chosenCountries={chosenCountries}
      />
      <Calendar
        countries={chosenCountries} />
      <AlertsContainer
        countries={chosenCountries} />
      <SubscriptionContainer
        countries={chosenCountries} />
      <Footer />
    </div>
  );
}

export default App;
