import axios from 'axios'

const RESOURCE_NAME = '/address'
const COUNTRIES = "/countries"
const CITIES = "/cities"

export const searchCountries = (source) => {
    return new Promise((resolve, reject) => {
        return axios.get(`${RESOURCE_NAME}${COUNTRIES}`, {
            cancelToken: source.token
        })
            .then((e) => resolve(e))
            .catch((error) => reject(error));
    })
};

export const searchCities = (idCountry, source) => {
    return new Promise((resolve, reject) => {
        return axios.get(`${RESOURCE_NAME}${CITIES}?idCountry=${idCountry}`, {
            cancelToken: source.token
        })
            .then((e) => resolve(e))
            .catch((error) => reject(error));
    })
};

export default {
    searchCountries,
    searchCities
}