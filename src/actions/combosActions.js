import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import combosService from '@/services/combosService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .search(query, source)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.COMBOS_SET_COMBOS, data);
      store.commit(mutationTypes.COMBOS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const searchOnSale = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  filter = {
    ...filter,
    onSale: true
  }

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .search(query, source)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.COMBOS_SET_ON_SALE_COMBOS, data);
      store.commit(mutationTypes.COMBOS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const add = (object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .add(object)
    .then((response) => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH, true)
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

  combosService
    .get(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_COMBO, data);
      store.commit(mutationTypes.COMBOS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const edit = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .edit(id, object)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH, true)
      toastr.success(messages.sucesso.edicao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getImages = (id, source, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .getImages(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_IMAGES, data);
      store.commit(mutationTypes.COMBOS_SET_SEARCH_IMAGES, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const deleteImage = (id, idImage, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .deleteImage(id, idImage)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH_IMAGES, true);
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const addImage = (id, file, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .addImage(id, file)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH_IMAGES, true);
      toastr.success(messages.sucesso.upload)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getCombos = (id, source, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .getCombos(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_COMBOS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const addProduct = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .addProduct(id, object)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH_PRODUCTS, true);
      toastr.success(messages.sucesso.cadastro)
      return true;
    }).catch(() => {
      return false;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getProducts = (id, source, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .getProducts(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_PRODUCTS, data);
      store.commit(mutationTypes.COMBOS_SET_SEARCH_PRODUCTS, false);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const deleteProduct = (id, idProduct, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .deleteProduct(id, idProduct)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH_PRODUCTS, true);
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const editProduct = (id, idProduct, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .editProduct(id, idProduct, object)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH_PRODUCTS, true);
      toastr.success(messages.sucesso.edicao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getScheduleYears = (id, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .getScheduleYears(id, source)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_YEARS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportScheduleFinishedYear = (id, year, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .getReportScheduleYear(id, year, source, true)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_REPORT_SCHEDULE_FINISHED_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportScheduleCanceledYear = (id, year, source, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .getReportScheduleYear(id, year, source, false)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.COMBOS_SET_REPORT_SCHEDULE_CANCELED_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchSchedules = (id, source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .searchSchedules(id, query, source)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.COMBOS_SET_SCHEDULES, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const toggleActive = (id, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .toggleActive(id)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH, true)
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const changeSale = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return combosService
    .changeSale(id, object)
    .then(() => {
      store.commit(mutationTypes.COMBOS_SET_SEARCH, true);
      toastr.success(messages.sucesso.cadastro)
      return true;
    }).catch(() => {
      return false;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchSales = (id, source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  combosService
    .searchSales(id, query, source)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.COMBOS_SET_SALES, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export default {
  search,
  searchOnSale,
  add,
  edit,
  get,
  getImages,
  deleteImage,
  addImage,
  getCombos,
  addProduct,
  getProducts,
  deleteProduct,
  editProduct,
  getScheduleYears,
  getReportScheduleFinishedYear,
  getReportScheduleCanceledYear,
  searchSchedules,
  toggleActive,
  changeSale,
  searchSales
}