import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_COMBOS]: set('combos'),
  [constants.MUTATION_SET_SEARCH]: set('search'),
  [constants.MUTATION_SET_SHOW_FILTER]: set('showFilter'),
  [constants.MUTATION_TOGGLE_SHOW_FILTER]: toggle('showFilter'),
  [constants.MUTATION_SET_COMBO]: set('combo'),
  [constants.MUTATION_SET_IMAGES]: set('images'),
  [constants.MUTATION_SET_SEARCH_IMAGES]: set('searchImages'),
  [constants.MUTATION_SET_PRODUCTS]: set('products'),
  [constants.MUTATION_SET_SEARCH_PRODUCTS]: set('searchProducts'),
  [constants.MUTATION_SET_PAGE]: set('page'),
  [constants.MUTATION_CLEAR_COMBOS]: set('combos', []),
  [constants.MUTATION_SET_SCHEDULE_YEARS]: set('scheduleYears'),
  [constants.MUTATION_SET_REPORT_SCHEDULE_FINISHED_YEAR]: set('reportScheduleFinishedYear'),
  [constants.MUTATION_SET_REPORT_SCHEDULE_CANCELED_YEAR]: set('reportScheduleCanceledYear'),
  [constants.MUTATION_SET_SCHEDULES]: set('schedules'),
  [constants.MUTATION_SET_SCHEDULES_PAGE]: set('schedulesPage'),
  [constants.MUTATION_SET_SALES]: set('sales'),
  [constants.MUTATION_SET_SALES_PAGE]: set('salesPage'),
}
