import axios from 'axios'
import base from './baseHttp'

const RESOURCE_NAME = '/agenda'
const MATERIALS = '/materials'
const PRODUCTS = '/products'
const COMBOS = '/combos'

export const checkStock = (object) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/checkStock`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const add = (object) => {
  return new Promise((resolve, reject) => {
    return axios.post(RESOURCE_NAME, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const search = (query, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}`, {
      params: query,
    }, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const cancel = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/cancel/${id}`, object)
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

export const getMaterials = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${MATERIALS}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const finish = (id, object) => {
  return new Promise((resolve, reject) => {
    return axios.post(`${RESOURCE_NAME}/finish/${id}`, object)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getProducts = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${PRODUCTS}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getCombos = (id, requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${COMBOS}`, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export default {
  checkStock,
  add,
  search,
  cancel,
  get,
  getMaterials,
  finish,
  getProducts,
  getCombos
}