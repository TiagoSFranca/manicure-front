import constants from './constants';

export default {
  [constants.ACTION_SET_AGENDA]({ commit }, data) {
    commit(constants.MUTATION_SET_PAGE, data.page)
    commit(constants.MUTATION_SET_AGENDA, data.content)
  },
  [constants.ACTION_SET_LATE_SCHEDULES]({ commit }, data) {
    commit(constants.MUTATION_SET_LATE_SCHEDULES_PAGE, data.page)
    commit(constants.MUTATION_SET_LATE_SCHEDULES, data.content)
  },
}