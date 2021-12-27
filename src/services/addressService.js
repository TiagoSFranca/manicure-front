import base from './baseHttp'

const RESOURCE_NAME = '/address'
const COUNTRIES = "/countries"
const CITIES = "/cities"

export const searchCountries = (requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}${COUNTRIES}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const searchCities = (idCountry, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}${CITIES}?idCountry=${idCountry}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export default {
  searchCountries,
  searchCities
}