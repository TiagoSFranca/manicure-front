import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import productsService from '@/services/materialsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

    let query = { ...filter, ...pagination, ...sort }

    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .search(query, source)
        .then((response) => {
            let data = response.data
            store.dispatch(actionTypes.MATERIALS_SET_MATERIALS, data);
            store.commit(mutationTypes.MATERIALS_SET_SEARCH, false)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
};

export default {
    search
}