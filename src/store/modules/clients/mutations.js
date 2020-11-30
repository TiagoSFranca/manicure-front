import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_CLIENTS]: set('clients'),
  [constants.MUTATION_SET_SEARCH]: set('search'),
  [constants.MUTATION_SET_SHOW_FILTER]: set('showFilter'),
  [constants.MUTATION_TOGGLE_SHOW_FILTER]: toggle('showFilter'),
  [constants.MUTATION_SET_CLIENT]: set('client'),
  [constants.MUTATION_SET_PAGE]: set('page'),
  [constants.MUTATION_CLEAR_CLIENTS]: set('clients', []),
}
