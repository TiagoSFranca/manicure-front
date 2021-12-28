import constants from './constants';

export default {
    [constants.ACTION_SET_CITIES]({ commit }, data) {
        commit(constants.MUTATION_SET_PAGE, data.page)
        commit(constants.MUTATION_SET_CITIES, data.content)
    },
}