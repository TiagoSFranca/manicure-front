import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import clientsService from '@/services/clientsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .search(query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.CLIENTS_SET_CLIENTS, data);
      store.commit(mutationTypes.CLIENTS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const add = (object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return clientsService
    .add(object)
    .then((response) => {
      store.commit(mutationTypes.CLIENTS_SET_SEARCH, true)
      toastr.success(messages.sucesso.cadastro)
      return { success: true, id: response.data.id };
    }).catch(() => {
      return { success: false };
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const get = (id, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .get(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.CLIENTS_SET_CLIENT, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const edit = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return clientsService
    .edit(id, object)
    .then(() => {
      store.commit(mutationTypes.CLIENTS_SET_SEARCH, true)
      toastr.success(messages.sucesso.edicao)
      return true;
    }).catch(() => {
      return false;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getScheduleYears = (id, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .getScheduleYears(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.CLIENTS_SET_YEARS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportScheduleFinishedYear = (id, year, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .getReportScheduleYear(id, year, true)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.CLIENTS_SET_REPORT_SCHEDULE_FINISHED_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportScheduleCanceledYear = (id, year, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .getReportScheduleYear(id, year, false)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.CLIENTS_SET_REPORT_SCHEDULE_CANCELED_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchSchedules = (id, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .searchSchedules(id, query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.CLIENTS_SET_SCHEDULES, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export default {
  search,
  add,
  edit,
  get,
  getScheduleYears,
  getReportScheduleFinishedYear,
  getReportScheduleCanceledYear,
  searchSchedules,
}