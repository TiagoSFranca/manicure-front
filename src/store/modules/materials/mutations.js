import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
    [constants.MUTATION_SET_MATERIALS]: set('materials'),
    [constants.MUTATION_SET_SEARCH]: set('search'),
    [constants.MUTATION_CLEAR_MATERIALS]: set('materials', []),
    [constants.MUTATION_SET_SHOW_FILTER]: set('showFilter'),
    [constants.MUTATION_TOGGLE_SHOW_FILTER]: toggle('showFilter'),
    [constants.MUTATION_SET_PAGE]: set('page'),
}