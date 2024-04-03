import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, TextField, Autocomplete, Chip } from '@mui/material';
import { countries } from '../../stores/Countries' //hardcoded data
import { getCountriesWithColors } from '../../utils/colorPicker';
import { useCountry, useCountryUpdate } from '../../CountryContext'
import { GET_COUNTRIES_ENDPOINT } from '../../constants/api'

import { ThemeProvider } from "@mui/material/styles";
import { theme } from '../../theme/MUItheme';
import './CountryContainer.css'

export default function CountryInput() {
    const [allCountries, setAllCountries] = useState([])
    const chosenCountries = useCountry()
    const setCountries = useCountryUpdate()

    useEffect(() => {
        let reqStatus = null;
        let active = true;
        let countriesWithColors = []
        
        axios.get(GET_COUNTRIES_ENDPOINT)
            .then((response) => {
                const countryList = response.data;
                reqStatus = response.status;
                countriesWithColors = getCountriesWithColors(countryList)})
            .catch(error => {
                console.log(error.message)});

        if (reqStatus < 200 || reqStatus >= 300 || !reqStatus) //if real data isn't available - use hardcoded data
            countriesWithColors = getCountriesWithColors(countries);

        if (active)
            setAllCountries(countriesWithColors);
    
        return () => {
            active = false;
        };
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Autocomplete data-testid='countryAutocomplete' className='country-input'
                multiple
                limitTags={6}
                id="tags-filled"
                onChange={(event, value) => setCountries(value)}
                sx={{ width: "100%" }}
                options={allCountries}
                value={chosenCountries || null}
                autoHighlight
                isOptionEqualToValue={(option, value) => option.isoAlpha2Code === value.isoAlpha2Code}
                filterSelectedOptions
                getOptionLabel={(option) => option.commonName || ""}
                renderOption={(props, option) => (
                    <Box data-testid='coutryOption' component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.isoAlpha2Code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.isoAlpha2Code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {option.commonName} ({option.isoAlpha2Code})
                    </Box>
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            data-testid='chosenCountry'
                            label={option.commonName}
                            style={{
                                backgroundColor: option.color,
                                color: "#FFF"
                            }}
                            {...getTagProps({ index })}
                        />
                ))}
                renderInput={(params) => (
                    <TextField
                        data-testid="searchField"
                        autoFocus
                        {...params}
                        placeholder="Choose a country"
                        sx={{
                            "& .MuiInputBase-root": {
                                color: 'rgba(44, 102, 174)',
                            }
                        }}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off',
                        }}
                    />
                )}
            />
        </ThemeProvider>
    )
}
