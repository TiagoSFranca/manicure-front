import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
    [constants.MUTATION_SET_MATERIALS]: set('materials'),
    [constants.MUTATION_SET_SEARCH]: set('search'),
    [constants.MUTATION_CLEAR_MATERIALS]: set('materials', [])
}
