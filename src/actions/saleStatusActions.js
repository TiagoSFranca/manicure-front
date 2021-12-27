import store from '@/store'
import { startLoading, endLoading } from '@/utils/methods'
import saleStatusService from '@/services/saleStatusService'
import mutationTypes from '@/store/mutationTypes'

export const search = (requestKey, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  saleStatusService
    .search(requestKey)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.SALE_STATUS_SET_SALE_STATUS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  search
}