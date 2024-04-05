import React, { useState, useEffect, useContext } from "react";

const CountryContext = React.createContext();
const CountryUpdateContext = React.createContext();

export function useCountry() {
    return useContext(CountryContext);
}

export function useCountryUpdate() {
    return useContext(CountryUpdateContext);
}

export function CountryProvider({ children }) {
    const [chosenCountries, setChosenCountries] = useState(() => {
        const savedCountries = JSON.parse(localStorage.getItem('chosenCountries'));
        return savedCountries || [];
    })

    useEffect(() => {
        localStorage.setItem("chosenCountries", JSON.stringify(chosenCountries));
    }, [chosenCountries])

    function setCountriesHandler(countries) {
        setChosenCountries(countries);
    }

    return (
        <CountryContext.Provider value={chosenCountries}>
            <CountryUpdateContext.Provider value={setCountriesHandler}>
                {children}
            </CountryUpdateContext.Provider>
        </CountryContext.Provider>
    )
}
