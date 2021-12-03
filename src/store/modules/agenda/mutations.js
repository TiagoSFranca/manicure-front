import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_AGENDA]: set('agenda'),
  [constants.MUTATION_SET_SEARCH]: set('search'),
  [constants.MUTATION_SET_SHOW_FILTER]: set('showFilter'),
  [constants.MUTATION_TOGGLE_SHOW_FILTER]: toggle('showFilter'),
  [constants.MUTATION_SET_PAGE]: set('page'),
  [constants.MUTATION_CLEAR_AGENDA]: set('agenda', []),
  [constants.MUTATION_SET_SCHEDULE]: set('schedule'),
  [constants.MUTATION_SET_MATERIALS]: set('materials'),
  [constants.MUTATION_SET_PRODUCTS]: set('products'),
  [constants.MUTATION_SET_COMBOS]: set('combos'),
  [constants.MUTATION_SET_LATE_SCHEDULES]: set('lateSchedules'),
  [constants.MUTATION_SET_LATE_SCHEDULES_PAGE]: set('lateSchedulesPage'),
}
