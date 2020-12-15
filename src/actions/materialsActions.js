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

export const get = (id, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .get(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.MATERIALS_SET_MATERIAL, data);
      store.commit(mutationTypes.MATERIALS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const edit = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return materialsService
    .edit(id, object)
    .then(() => {
      store.commit(mutationTypes.MATERIALS_SET_SEARCH, true)
      toastr.success(messages.sucesso.edicao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const updateStock = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return materialsService
    .updateStock(id, object)
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

export const getYears = (id, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .getYears(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.MATERIALS_SET_YEARS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportYear = (id, year, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .getReportYear(id, year, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.MATERIALS_SET_REPORT_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  search,
  add,
  get,
  edit,
  updateStock,
  getYears,
  getReportYear
}