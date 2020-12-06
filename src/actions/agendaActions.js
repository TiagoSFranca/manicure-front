import store from '@/store'
import { startLoading, endLoading } from '@/utils/methods'
import agendaService from '@/services/agendaService'

export const checkStock = (object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return agendaService
        .checkStock(object)
        .then((response) => {
            return response.data;
        }).catch(() => {
            return null;
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const add = (object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return agendaService
        .add(object)
        .then((response) => {
            // store.commit(mutationTypes.PRODUCTS_SET_SEARCH, true)
            toastr.success(messages.sucesso.cadastro)
            return { success: true, id: response.data.id };
        }).catch(() => {
            return { success: false };
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export default {
    checkStock,
    add
}