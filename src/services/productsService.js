import axios from 'axios'
import products from '@/arr/products'

const RESOURCE_NAME = '/Pets'

export const get = (query, source) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve({ data: products })
    }, 3000);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export default {
  get,
}