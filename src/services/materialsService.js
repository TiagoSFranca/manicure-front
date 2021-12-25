import axios from 'axios'
import base from './baseHttp'

const RESOURCE_NAME = '/materials'
const STOCK = "/stock"

export const search = (query) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}`, {
      params: query,
    })
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

export const get = (id) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}`)
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

export const getYears = (id) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${STOCK}/years`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getReportYear = (id, year, isRegister) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${STOCK}/report/${year}?isRegister=${isRegister}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const searchMaterialStocks = (id, query) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${STOCK}`, {
      params: query,
    })
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