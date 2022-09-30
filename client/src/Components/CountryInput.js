import React, { useEffect, useState, useCallback } from 'react'
import './CountryContainer.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { countries } from '../stores/Countries'
import { colors } from '../stores/Colors'
import { GET_COUNTRIES_ENDPOINT } from '../constants/api'
import axios from 'axios';


export default function CountryInput({ setCountries, chosenCountries }) {
    const [allCountries, setAllCountries] = useState([])

    const countryNameToColour = useCallback((countryName) => {
        let hash = 0;
        if (countryName.length === 0)
            return hash;
        for (let i = 0; i < countryName.length; i++) {
            hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        hash = ((hash % colors.length) + colors.length) % colors.length;
        return colors[hash];
    }, [allCountries.length])

    useEffect(() => {
        let reqStatus = null
        axios.get(GET_COUNTRIES_ENDPOINT).then((response) => {
            const countryList = response.data;
            reqStatus = response.status
            const countriesWithColors = countryList.map(country => {
                country.color = countryNameToColour(country.commonName)
                return country
            })
            setAllCountries(countriesWithColors)
        }).catch(error => {
            console.log(error.message)
        });
        if (reqStatus < 200 || reqStatus >= 300) {
            const countriesWithColors = countries.map(country => {
                country.color = countryNameToColour(country.commonName)
                return country
            })
            setAllCountries(countriesWithColors)
        }
        console.log(allCountries);
    }, [allCountries.length])


    const theme = createTheme({
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        ".MuiOutlinedInput-notchedOutline": {
                            minHeight: 60,
                            borderRadius: 15,
                            outline: 'none',
                            paddingLeft: 15,
                            border: '2px solid #2C66AE70',
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: '.149rem solid #599beb'
                        },
                        "&:focus .MuiOutlinedInput-notchedOutline": {
                            border: '.149rem solid #599beb'
                        }
                    }
                }
            }
        }
    });


    return (
        <ThemeProvider theme={theme}>
            <Autocomplete className='country-input'
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
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
                            label={option.commonName}
                            style={{
                                backgroundColor: option.color,
                                color: "#FFF"
                            }}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
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
