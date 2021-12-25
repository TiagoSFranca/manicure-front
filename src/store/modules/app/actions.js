import { store } from 'core-js/modules/_wks';
import constants from './constants';

export default {
  [constants.ACTION_LOADING]({ commit, state }, loading) {
    commit(constants.MUTATION_SET_LOADING, { ...state.loading, ...loading.loading })
  },

  [constants.ACTION_ADD_CANCEL_TOKEN]({ commit, state }, data) {
    let cancelTokens = state.cancelTokens || [];

    cancelTokens.push(data)

    commit(constants.MUTATION_SET_CANCEL_TOKENS, cancelTokens)
  },

  [constants.ACTION_CLEAR_PENDING_REQUESTS]({ commit, state }) {
    if ((state.cancelTokens || []).length > 0) {
      state.cancelTokens.forEach((request) => {
        request.abort();
      });
    }
    commit(constants.MUTATION_CLEAR_CANCEL_TOKENS)
  },
}