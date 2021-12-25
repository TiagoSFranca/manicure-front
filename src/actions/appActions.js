import store from '@/store'
import mutationTypes from '@/store/mutationTypes'
import actionTypes from '@/store/actionTypes'

export const setNoConnection = (noConnection = true) => {
  store.commit(mutationTypes.APP_SET_NO_CONNECTION, noConnection)
}

export const toggleDrawer = () => {
  store.commit(mutationTypes.APP_TOGGLE_DRAWER)
}

export const addCancelToken = (token) => {
  store.dispatch(actionTypes.APP_ADD_CANCEL_TOKEN, token)
}

export const cancelPendingRequests = () => {
  store.dispatch(actionTypes.APP_CANCEL_PENDING_REQUESTS)
}

export default {
  setNoConnection,
  toggleDrawer,
  addCancelToken,
  cancelPendingRequests
}