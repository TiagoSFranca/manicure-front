import { set, toggle } from '@/utils/vuex'

export default {
  setProducts: set('products'),
  setSearch: set('search'),
  setShowFilter: set('showFilter'),
  toggleShowFilter: toggle('showFilter')
}
