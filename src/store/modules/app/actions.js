import constants from './constants';

export default {
  [constants.ACTION_LOADING]({ commit, state }, loading) {
    commit(constants.MUTATION_SET_LOADING, { ...state.loading, ...loading.loading })
  },
}