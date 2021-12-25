import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import materialsService from '@/services/materialsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .search(query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.MATERIALS_SET_MATERIALS, data);
      store.commit(mutationTypes.MATERIALS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const searchWarningStock = (filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  filter = {
    ...filter,
    warningOrError: true
  }

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .search(query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.MATERIALS_SET_WARNING_STOCK_MATERIALS, data);
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

export const get = (id, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .get(id)
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

export const getYears = (id, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .getYears(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.MATERIALS_SET_YEARS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportRegisterYear = (id, year, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .getReportYear(id, year, true)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.MATERIALS_SET_REPORT_REGISTER_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportRemoveYear = (id, year, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .getReportYear(id, year, false)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.MATERIALS_SET_REPORT_REMOVE_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchMaterialStocks = (id, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  materialsService
    .searchMaterialStocks(id, query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.MATERIALS_SET_MATERIAL_STOCKS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const toggleActive = (id, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return materialsService
    .toggleActive(id)
    .then(() => {
      store.commit(mutationTypes.MATERIALS_SET_SEARCH, true)
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export default {
  search,
  searchWarningStock,
  add,
  get,
  edit,
  updateStock,
  getYears,
  getReportRegisterYear,
  getReportRemoveYear,
  searchMaterialStocks,
  toggleActive
}