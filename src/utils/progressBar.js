import store from '@/store'
import mutationTypes from '@/store/mutationTypes'

export default {
  show(show) {
    store.commit(mutationTypes.APP_SET_PROGRESS_BAR, show)
  }
}
