import { set } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_CITIES]: set('cities'),
  [constants.MUTATION_SET_COUNTRIES]: set('countries'),
  [constants.MUTATION_CLEAR_CITIES]: set('cities', []),
  [constants.MUTATION_CLEAR_COUNTRIES]: set('countries', []),
  [constants.MUTATION_SET_PAGE]: set('page'),
}
