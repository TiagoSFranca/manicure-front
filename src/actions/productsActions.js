import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import productsService from '@/services/productsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const get = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

    let query = { ...filter, ...pagination, ...sort }

    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .get(query, source)
        .then((response) => {
            let data = response.data
            store.dispatch(actionTypes.PRODUCTS_SET_PRODUCTS, data);
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH, false)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
};

export const add = (object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .add(object)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true)
            toastr.success(messages.sucesso.cadastro)
            return true;
        }).catch(() => {
            return false;
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const edit = (object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .edit(object)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true)
            toastr.success(messages.sucesso.edicao)
            return true;
        }).catch(() => {
            return false;
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}
export default {
    get,
    add,
    edit
}