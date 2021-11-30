import store from '@/store'
import mutationTypes from '@/store/mutationTypes'

const timeout = 3000

function show(toastr) {
  store.commit(mutationTypes.APP_SET_TOASTR, toastr)
}

export default {
  success(text) {
    show({
      show: true,
      text: text,
      color: 'success',
      timeout: timeout,
      errors: []
    })
  },
  error(text, errors) {
    show({
      show: true,
      text: text,
      color: 'error',
      timeout: timeout,
      errors: errors
    })
  }
}
