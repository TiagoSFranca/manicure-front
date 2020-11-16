import toastr from '@/utils/toastr'
import store from '@/store'
import messages from '@/utils/messages'
import { startLoading, endLoading } from '@/utils/methods'
import productsService from '@/services/productsService'
import actionTypes from '@/store/actionTypes'
import mutationTypes from '@/store/mutationTypes'

export const search = (source, filter, pagination, sort, LOADING_IDENTIFIER = '') => {

    let query = { ...filter, ...pagination, ...sort }

    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .search(query, source)
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

export const get = (id, source, LOADING_IDENTIFIER = '') => {

    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .get(id, source)
        .then((response) => {
            let data = response.data
            store.commit(mutationTypes.PRODUCTS_SET_PRODUCT, data);
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const edit = (id, object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .edit(id, object)
        .then((response) => {
            let data = response.data
            store.commit(mutationTypes.PRODUCTS_SET_PRODUCT, data);
            toastr.success(messages.sucesso.edicao)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const getImages = (id, source, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .getImages(id, source)
        .then((response) => {
            let data = response.data
            store.commit(mutationTypes.PRODUCTS_SET_IMAGES, data);
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_IMAGES, false)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const deleteImage = (id, idImage, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .deleteImage(id, idImage)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_IMAGES, true);
            toastr.success(messages.sucesso.exclusao)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const addImage = (id, file, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .addImage(id, file)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_IMAGES, true);
            toastr.success(messages.sucesso.upload)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const getCombos = (id, source, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .getCombos(id, source)
        .then((response) => {
            let data = response.data
            store.commit(mutationTypes.PRODUCTS_SET_COMBOS, data);
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const addMaterial = (id, object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .addMaterial(id, object)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, true);
            toastr.success(messages.sucesso.cadastro)
            return true;
        }).catch(() => {
            return false;
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const getMaterials = (id, source, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    productsService
        .getMaterials(id, source)
        .then((response) => {
            let data = response.data
            store.commit(mutationTypes.PRODUCTS_SET_MATERIALS, data);
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, false);
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const deleteMaterial = (id, idMaterial, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .deleteMaterial(id, idMaterial)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, true);
            toastr.success(messages.sucesso.exclusao)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export const editMaterial = (id, idMaterial, object, LOADING_IDENTIFIER = '') => {
    store.dispatch(startLoading(LOADING_IDENTIFIER));

    return productsService
        .editMaterial(id, idMaterial, object)
        .then(() => {
            store.commit(mutationTypes.PRODUCTS_SET_SEARCH_MATERIALS, true);
            toastr.success(messages.sucesso.edicao)
        }).catch(() => {
        }).finally(() => {
            store.dispatch(endLoading(LOADING_IDENTIFIER));
        })
}

export default {
    search,
    add,
    edit,
    get,
    getImages,
    deleteImage,
    addImage,
    getCombos,
    addMaterial,
    getMaterials,
    deleteMaterial,
    editMaterial
}