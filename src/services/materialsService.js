import axios from 'axios'
import base from './baseHttp'

const RESOURCE_NAME = '/materials'
const STOCK = "/stock"

export const search = (query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}`, {
      params: query,
    }, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const add = (object) => {
  return new Promise((resolve, reject) => {
    return axios.post(RESOURCE_NAME, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const get = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const edit = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.put(`${RESOURCE_NAME}/${id}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const updateStock = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/${id}${STOCK}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getYears = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${STOCK}/years`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getReportYear = (id, year, isRegister, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${STOCK}/report/${year}?isRegister=${isRegister}`,
      null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const searchMaterialStocks = (id, query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${STOCK}`, {
      params: query,
    }, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const toggleActive = (id) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/${id}/toggleActive`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export default {
  search,
  add,
  get,
  edit,
  updateStock,
  getYears,
  getReportYear,
  searchMaterialStocks,
  toggleActive
}