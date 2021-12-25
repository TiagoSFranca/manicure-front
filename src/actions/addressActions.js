import store from '@/store'
import { startLoading, endLoading } from '@/utils/methods'
import addressService from '@/services/addressService'
import mutationTypes from '@/store/mutationTypes'

export const searchCountries = (LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  addressService
    .searchCountries()
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.ADDRESS_SET_COUNTRIES, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchCities = (idCountry, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  addressService
    .searchCities(idCountry)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.ADDRESS_SET_CITIES, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  searchCountries,
  searchCities
}