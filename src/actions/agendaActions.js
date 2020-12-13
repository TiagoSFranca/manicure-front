import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import agendaService from '@/services/agendaService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const checkStock = (object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return agendaService
    .checkStock(object)
    .then((response) => {
      return response.data;
    }).catch(() => {
      return null;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const add = (object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return agendaService
    .add(object)
    .then((response) => {
      store.commit(mutationTypes.AGENDA_SET_SEARCH, true)
      toastr.success(messages.sucesso.cadastro)
      return { success: true, id: response.data.id };
    }).catch(() => {
      return { success: false };
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const search = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  agendaService
    .search(query, source)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.AGENDA_SET_AGENDA, data);
      store.commit(mutationTypes.AGENDA_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const cancel = (id, object, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return agendaService
    .cancel(id, object)
    .then(() => {
      store.commit(mutationTypes.AGENDA_SET_SEARCH, true)
      toastr.success(messages.sucesso.cadastro)
      return { success: true };
    }).catch(() => {
      return { success: false };
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  checkStock,
  add,
  search,
  cancel
}