import base from './baseHttp'

const RESOURCE_NAME = '/address'
const COUNTRIES = "/countries"
const CITIES = "/cities"

export const searchCountries = () => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}${COUNTRIES}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const searchCities = (idCountry) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}${CITIES}?idCountry=${idCountry}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export default {
  searchCountries,
  searchCities
}