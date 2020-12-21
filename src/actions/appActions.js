import store from '@/store'
import mutationTypes from '@/store/mutationTypes'

export const setNoConnection = (noConnection = true) => {
  store.commit(mutationTypes.APP_SET_NO_CONNECTION, noConnection)
}

export default {
  setNoConnection
}