import { set } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_SCHEDULE_STATUS]: set('scheduleStatuses'),
}
