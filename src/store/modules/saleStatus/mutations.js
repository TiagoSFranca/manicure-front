import { set } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_SALE_STATUS]: set('saleStatuses'),
}
