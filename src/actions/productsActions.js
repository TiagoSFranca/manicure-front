import axios from 'axios'
import progressBar from '@/utils/progressBar'
import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { mountPaginationQuery } from '@/utils/methods'
import productsService from '@/services/productsService'

function montarQueryFiltro(filter) {
    let query = ''
    if (filter) {
        if (filter.nome)
            query += '&nome=' + filter.nome
        if (filter.especie)
            query += '&especie=' + filter.especie
        if (filter.raca)
            query += '&raca=' + filter.raca
        if (filter.idsGeneroPet)
            filter.idsGeneroPet.forEach((element) => {
                query += '&idGeneros=' + element
            })

    }
    return query
}

export const get = (source, filter, pagination, sort) => {
    let queryFiltro = montarQueryFiltro(filter)
    let queryPaginacao = mountPaginationQuery(pagination);

    let query = '?';

    query += queryFiltro
    query += queryPaginacao

    return productsService
        .get(query, source)
        .then((response) => {
            let data = response.data
            store.dispatch('products/setProducts', data);
            store.commit('products/setSearch', false)
            return true
        }).catch(() => {
            return false
        }).finally(() => {
            return true;
        })
};

export default {
    get,
}