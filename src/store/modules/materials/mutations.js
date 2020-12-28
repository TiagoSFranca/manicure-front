import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_MATERIALS]: set('materials'),
  [constants.MUTATION_SET_SEARCH]: set('search'),
  [constants.MUTATION_CLEAR_MATERIALS]: set('materials', []),
  [constants.MUTATION_SET_SHOW_FILTER]: set('showFilter'),
  [constants.MUTATION_TOGGLE_SHOW_FILTER]: toggle('showFilter'),
  [constants.MUTATION_SET_PAGE]: set('page'),
  [constants.MUTATION_SET_MATERIAL]: set('material'),
  [constants.MUTATION_SET_YEARS]: set('years'),
  [constants.MUTATION_SET_REPORT_REGISTER_YEAR]: set('reportRegisterYear'),
  [constants.MUTATION_SET_REPORT_REMOVE_YEAR]: set('reportRemoveYear'),
  [constants.MUTATION_SET_MATERIAL_STOCKS]: set('materialStocks'),
  [constants.MUTATION_SET_MATERIAL_STOCK_PAGE]: set('materialStockPage'),
}
