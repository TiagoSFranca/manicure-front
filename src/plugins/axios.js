import Vue from 'vue'
import axios from 'axios'
import "@/middleware/axiosRequest"
import "@/middleware/axiosResponse"
import Qs from 'qs';

axios.defaults.baseURL = process.env.VUE_APP_API_URL || "/api"
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.paramsSerializer = (params) => {
  return Qs.stringify(params, { arrayFormat: 'repeat' })
};

Vue.prototype.$http = axios
