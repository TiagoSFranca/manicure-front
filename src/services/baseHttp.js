import axios from 'axios';
import axiosSourceToken from '@/utils/axiosSourceToken';

export const get = (url, params) => {
    return axios.get(url, {
        ...params,
        signal: axiosSourceToken.getCancelToken().signal
    })
}

export default {
    get
}