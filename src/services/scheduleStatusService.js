import base from './baseHttp'

const RESOURCE_NAME = '/scheduleStatuses'

export const search = (requestKey) => {
  return new Promise((resolve, reject) => {
    return base.get(RESOURCE_NAME, null, requestKey)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export default {
  search,
}