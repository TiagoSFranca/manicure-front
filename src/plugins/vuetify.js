import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  theme: {
    themes: {
      light:  {
        primary: '#9c27b0',
        secondary: '#673ab7',
        accent: '#2196f3',
        error: '#f44336',
        warning: '#ffc107',
        info: '#607d8b',
        success: '#4caf50'
      }
    }
  }
})