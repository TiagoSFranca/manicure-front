import constants from './constants';

const cancel = (toCancel) => {
  if ((toCancel || []).length > 0) {
    toCancel.forEach((request) => {
      request.token.abort();
    });
  }
}

export default {
  [constants.ACTION_LOADING]({ commit, state }, loading) {
    commit(constants.MUTATION_SET_LOADING, { ...state.loading, ...loading.loading })
  },

  [constants.ACTION_ADD_CANCEL_TOKEN]({ commit, state }, data) {
    let cancelTokens = state.cancelTokens || [];

    cancelTokens.push(data)

    commit(constants.MUTATION_SET_CANCEL_TOKENS, cancelTokens)
  },

  [constants.ACTION_CANCEL_APP_PENDING_REQUEST]({ commit, state }) {
    cancel(state.cancelTokens)
    commit(constants.MUTATION_CLEAR_CANCEL_TOKENS)
  },

  [constants.ACTION_CANCEL_PENDING_REQUEST]({ commit, state }, requestKey) {
    let cancelTokens = (state.cancelTokens || []);
    let toKeep = cancelTokens.filter(e => e.requestKey != requestKey);
    let toCancel = cancelTokens.filter(e => e.requestKey == requestKey);
    cancel(toCancel);

    commit(constants.MUTATION_SET_CANCEL_TOKENS, toKeep)
  },
}
