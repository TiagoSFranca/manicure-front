import { set, toggle } from '@/utils/vuex'
import constants from './constants'

export default {
  [constants.MUTATION_SET_DRAWER]: set('drawer'),
  [constants.MUTATION_SET_IMAGE]: set('image'),
  [constants.MUTATION_SET_COLOR]: set('color'),
  [constants.MUTATION_TOGGLE_DRAWER]: toggle('drawer'),
  [constants.MUTATION_SET_TOASTR]: set('toastr'),
  [constants.MUTATION_SET_PROGRESS_BAR]: set('progressBar'),
  [constants.MUTATION_TOGGLE_PROGRESS_BAR]: toggle('progressBar'),
  [constants.MUTATION_SET_LOADING]: set('loading'),
  [constants.MUTATION_SET_NO_CONNECTION]: set('noConnection')
}
