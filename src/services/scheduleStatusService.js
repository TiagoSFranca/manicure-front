import axios from 'axios'

const RESOURCE_NAME = '/scheduleStatuses'

export const search = (source) => {
  return new Promise((resolve, reject) => {
    return axios.get(RESOURCE_NAME, {
      cancelToken: source.token
    })
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export default {
  search,
}