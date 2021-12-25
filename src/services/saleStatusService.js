import base from './baseHttp'

const RESOURCE_NAME = '/saleStatuses'

export const search = () => {
  return new Promise((resolve, reject) => {
    return base.get(RESOURCE_NAME)
      .then((e) => resolve(e))
      .catch((error) => reject(error));
  })
};

export default {
  search,
}