import axios from 'axios';
import axiosSourceToken from '@/utils/axiosSourceToken';

export const get = (url, params, requestKey) => {
    return axios.get(url, {
        ...params,
        signal: axiosSourceToken.getCancelToken(requestKey).signal
    })
}

export default {
    get
}