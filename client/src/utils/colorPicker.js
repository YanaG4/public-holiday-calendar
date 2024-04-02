import { colors } from '../stores/Colors'

export const countryNameToColour = (countryName) => {
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

export const getCountriesWithColors = (countryList) => {
    if(!Array.isArray(countryList)) return []
    return countryList.map(country => {
        country.color = countryNameToColour(country.commonName)
        return country })
    }
