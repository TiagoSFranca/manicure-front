import constants from './constants';

export default {
    [constants.ACTION_SET_PRODUCTS]({ commit }, data) {
        commit(constants.MUTATION_SET_PRODUCTS, data)
    },
}