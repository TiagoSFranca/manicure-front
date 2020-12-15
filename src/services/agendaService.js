import axios from 'axios'

const RESOURCE_NAME = '/agenda'

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

export const search = (query, source) => {
  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}`, {
      params: query,
      cancelToken: source.token
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

export default {
  checkStock,
  add,
  search,
  cancel
}