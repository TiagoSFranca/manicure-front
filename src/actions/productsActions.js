import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import productsService from '@/services/productsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .search(query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.PRODUCTS_SET_PRODUCTS, data);
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const searchOnSale = (filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  filter = {
    ...filter,
    onSale: true
  }

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .search(query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.PRODUCTS_SET_ON_SALE_PRODUCTS, data);
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const add = (object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .add(object)
    .then((response) => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true)
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

  productsService
    .get(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_PRODUCT, data);
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const edit = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .edit(id, object)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true)
      toastr.success(messages.sucesso.edicao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getImages = (id, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .getImages(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_IMAGES, data);
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_IMAGES, false)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const deleteImage = (id, idImage, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .deleteImage(id, idImage)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_IMAGES, true);
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const addImage = (id, file, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .addImage(id, file)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_IMAGES, true);
      toastr.success(messages.sucesso.upload)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getCombos = (id, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .getCombos(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_COMBOS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const addMaterial = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .addMaterial(id, object)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, true);
      toastr.success(messages.sucesso.cadastro)
      return true;
    }).catch(() => {
      return false;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getMaterials = (id, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .getMaterials(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_MATERIALS, data);
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, false);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const deleteMaterial = (id, idMaterial, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .deleteMaterial(id, idMaterial)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, true);
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const editMaterial = (id, idMaterial, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .editMaterial(id, idMaterial, object)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, true);
      toastr.success(messages.sucesso.edicao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getScheduleYears = (id, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .getScheduleYears(id)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_YEARS, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportScheduleFinishedYear = (id, year, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .getReportScheduleYear(id, year, true)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_REPORT_SCHEDULE_FINISHED_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const getReportScheduleCanceledYear = (id, year, LOADING_IDENTIFIER = '') => {

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .getReportScheduleYear(id, year, false)
    .then((response) => {
      let data = response.data
      store.commit(mutationTypes.PRODUCTS_SET_REPORT_SCHEDULE_CANCELED_YEAR, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchSchedules = (id, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .searchSchedules(id, query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.PRODUCTS_SET_SCHEDULES, data);
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
};

export const toggleActive = (id, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .toggleActive(id)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true)
      toastr.success(messages.sucesso.exclusao)
    }).catch(() => {
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const changeSale = (id, object, LOADING_IDENTIFIER = '') => {
  store.dispatch(startLoading(LOADING_IDENTIFIER));

  return productsService
    .changeSale(id, object)
    .then(() => {
      store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true);
      toastr.success(messages.sucesso.cadastro)
      return true;
    }).catch(() => {
      return false;
    }).finally(() => {
      store.dispatch(endLoading(LOADING_IDENTIFIER));
    })
}

export const searchSales = (id, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

  let query = { ...filter, ...pagination, ...sort }

  store.dispatch(startLoading(LOADING_IDENTIFIER));

  productsService
    .searchSales(id, query)
    .then((response) => {
      let data = response.data
      store.dispatch(actionTypes.PRODUCTS_SET_SALES, data);
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
  addMaterial,
  getMaterials,
  deleteMaterial,
  editMaterial,
  getScheduleYears,
  getReportScheduleFinishedYear,
  getReportScheduleCanceledYear,
  searchSchedules,
  toggleActive,
  changeSale,
  searchSales
}