import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import materialsService from '@/services/materialsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .search(query, source)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.MATERIALS_SET_MATERIALS, data);
      store.commit(mutationTypes.MATERIALS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const add = (object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return materialsService
    .add(object)
    .then(() => {
      store.commit(mutationTypes.MATERIALS_SET_SEARCH, true)
      toastr.success(messages.sucesso.cadastro)
      return true;
    }).catch(() => {
      return false;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  search,
  add
}