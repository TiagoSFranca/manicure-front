import axios from 'axios'
import materials from '@/arr/materials'

const RESOURCE_NAME = '/materials'

export const search = (query, source) => {
  let strQuery = new URLSearchParams(query).toString();

  return new Promise((resolve, reject) => {
    return axios.get(`${RESOURCE_NAME}?${strQuery}`, {
      cancelToken: source.token
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

export default {
  search,
  add
}