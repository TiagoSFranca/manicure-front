import store from '@/store'
import mutationTypes from '@/store/mutationTypes'

export const setNoConnection = (noConnection = true) => {
  store.commit(mutationTypes.APP_SET_NO_CONNECTION, noConnection)
}

export const toggleDrawer = () => {
  store.commit(mutationTypes.APP_TOGGLE_DRAWER)
}

export default {
  setNoConnection,
  toggleDrawer
}