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

export const search = (query) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}`, {
      params: query,
    })
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

export const get = (id) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export const getMaterials = (id) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${MATERIALS}`)
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

export const getProducts = (id) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${PRODUCTS}`)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
}

export const getCombos = (id) => {
  return new Promise((resolve, reject) => {
    return base.get(`${RESOURCE_NAME}/${id}${COMBOS}`)
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