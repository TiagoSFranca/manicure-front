import axios from 'axios'
import products from '@/arr/products'

const RESOURCE_NAME = '/Pets'

export const get = (query, source) => {
  console.log("TEST", new URLSearchParams(query).toString())

  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: products })
    }, 3000);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export const add = (object) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(object)
    }, 3000);
  })
}

export const edit = (object) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(object)
    }, 3000);
  })
}

export default {
  get,
  add,
  edit
}