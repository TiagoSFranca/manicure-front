import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import clientsService from '@/services/clientsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .search(query, source)
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

export const get = (id, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  clientsService
    .get(id, source)
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
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  search,
  add,
  edit,
  get,
}