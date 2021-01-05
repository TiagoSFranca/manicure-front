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
}