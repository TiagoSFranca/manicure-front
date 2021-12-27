import store from '@/store'
import { startLoading, endLoading } from '@/utils/methods'
import scheduleStatusService from '@/services/scheduleStatusService'
import mutationTypes from '@/store/mutationTypes'

export const search = (requestKey, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  scheduleStatusService
    .search(requestKey)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.SCHEDULE_STATUS_SET_SCHEDULE_STATUS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  search
}