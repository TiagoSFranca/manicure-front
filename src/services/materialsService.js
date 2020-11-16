import axios from 'axios'
import materials from '@/arr/materials'

const RESOURCE_NAME = '/Pets'

export const search = (query, source) => {
  console.log("TEST", new URLSearchParams(query).toString())

  return new Promise((resolve) => {
    setTimeout(function () {
      resolve({ data: materials })
    }, 3000);

    // axios.get(RESOURCE_NAME + query, {
    //   cancelToken: source.token
    // })
  })
};

export default {
  search
}