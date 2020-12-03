import axios from 'axios'

const RESOURCE_NAME = '/agenda'

export const checkStock = (object) => {
    return new Promise((resolve, reject) => {
        return axios.post(`${RESOURCE_NAME}/checkStock`, object)
            .then((e) => resolve(e))
            .catch((error) => reject(error));
    })
}

export default {
    checkStock
}