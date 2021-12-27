import store from '@/store'
import mutationTypes from '@/store/mutationTypes'
import actionTypes from '@/store/actionTypes'

export const setNoConnection = (noConnection = true) => {
  store.commit(mutationTypes.APP_SET_NO_CONNECTION, noConnection)
}

export const toggleDrawer = () => {
  store.commit(mutationTypes.APP_TOGGLE_DRAWER)
}

const getTokenData = (token, requestKey) => {
  return {
    token: token,
    requestKey: requestKey
  }
}

export const addCancelToken = (token, requestKey) => {
  let data = getTokenData(token, requestKey)
  store.dispatch(actionTypes.APP_ADD_CANCEL_TOKEN, data)
}

export const cancelPendingRequests = () => {
  store.dispatch(actionTypes.APP_CANCEL_ALL_PENDING_REQUEST)
}

export const cancelToken = (requestKey) => {
  store.dispatch(actionTypes.APP_CANCEL_PENDING_REQUEST, requestKey)
}

export default {
  setNoConnection,
  toggleDrawer,
  addCancelToken,
  cancelPendingRequests,
  cancelToken
}