import React, { useEffect, useState } from 'react'
import './CountryContainer.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { countries } from '../stores/Countries'
import { colors } from '../stores/Colors'


export default function CountryInput({ setCountries }) {
    const [allCcountries, setAllCountries] = useState(countries)
    useEffect(() => {
        const countriesWithColors = countries.map(country => {
            country.color = countryNameToColour(country.label)
            return country
        })
        setAllCountries(countriesWithColors)
    }, [])


    function countryNameToColour(countryName) {
        let hash = 0;

        if (countryName.length === 0)
            return hash;
        for (let i = 0; i < countryName.length; i++) {
            hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash;
        }
        hash = ((hash % colors.length) + colors.length) % colors.length;
        return colors[hash];
    }


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
                options={allCcountries}
                autoHighlight
                filterSelectedOptions
                getOptionLabel={(option) => option.label || ""}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                        {option.label} ({option.code})
                    </Box>
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.label}
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
