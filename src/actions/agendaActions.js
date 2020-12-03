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


export default {
    checkStock
}