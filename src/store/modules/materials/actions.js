import constants from './constants';

export default {
    [constants.ACTION_SET_MATERIALS]({ commit }, data) {
        commit(constants.MUTATION_SET_MATERIALS, data)
    },
}