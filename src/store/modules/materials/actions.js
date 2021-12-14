import constants from './constants';

export default {
  [constants.ACTION_SET_MATERIALS]({ commit }, data) {
    commit(constants.MUTATION_SET_MATERIALS, data.content)
    commit(constants.MUTATION_SET_PAGE, data.page)
  },

  [constants.ACTION_SET_WARNING_STOCK_MATERIALS]({ commit }, data) {
    commit(constants.MUTATION_SET_WARNING_STOCK_MATERIALS, data.content)
    commit(constants.MUTATION_SET_WARNING_STOCK_PAGE, data.page)
  },

  [constants.ACTION_SET_MATERIAL_STOCKS]({ commit }, data) {
    commit(constants.MUTATION_SET_MATERIAL_STOCKS, data.content)
    commit(constants.MUTATION_SET_MATERIAL_STOCK_PAGE, data.page)
  },
}