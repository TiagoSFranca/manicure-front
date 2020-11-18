import Vue from 'vue'
import axios from 'axios'
import "@/middleware/axiosRequest"
import "@/middleware/axiosResponse"

axios.defaults.baseURL = process.env.VUE_APP_API_URL || "/api"
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$http = axios
