import constants from './constants';

export default {
  [constants.ACTION_SET_PRODUCTS]({ commit }, data) {
    commit(constants.MUTATION_SET_PAGE, data.page)
    commit(constants.MUTATION_SET_PRODUCTS, data.content)
  },

  [constants.ACTION_SET_SCHEDULES]({ commit }, data) {
    commit(constants.MUTATION_SET_SCHEDULES, data.content)
    commit(constants.MUTATION_SET_SCHEDULES_PAGE, data.page)
  },

  [constants.ACTION_SET_SALES]({ commit }, data) {
    commit(constants.MUTATION_SET_SALES, data.content)
    commit(constants.MUTATION_SET_SALES_PAGE, data.page)
  },
}