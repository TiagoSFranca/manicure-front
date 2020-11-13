import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_PRODUCTS]: set('products'),
  [constants.MUTATION_SET_SEARCH]: set('search'),
  [constants.MUTATION_SET_SHOW_FILTER]: set('showFilter'),
  [constants.MUTATION_TOGGLE_SHOW_FILTER]: toggle('showFilter')
}
