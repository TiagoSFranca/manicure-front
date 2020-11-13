import app from './modules/app/constants'
import products from './modules/products/constants'

// APP
export const APP_SET_LOADING = `${app.MODULE_NAME}/${app.MUTATION_SET_LOADING}`;
export const APP_SET_DRAWER = `${app.MODULE_NAME}/${app.MUTATION_SET_DRAWER}`;
export const APP_SET_IMAGE = `${app.MODULE_NAME}/${app.MUTATION_SET_IMAGE}`;
export const APP_SET_COLOR = `${app.MODULE_NAME}/${app.MUTATION_SET_COLOR}`;
export const APP_TOGGLE_DRAWER = `${app.MODULE_NAME}/${app.MUTATION_TOGGLE_DRAWER}`;
export const APP_SET_TOASTR = `${app.MODULE_NAME}/${app.MUTATION_SET_TOASTR}`;
export const APP_SET_PROGRESS_BAR = `${app.MODULE_NAME}/${app.MUTATION_SET_PROGRESS_BAR}`;
export const APP_TOGGLE_PROGRESS_BAR = `${app.MODULE_NAME}/${app.MUTATION_TOGGLE_PROGRESS_BAR}`;

// PRODUCTS
export const PRODUCTS_SET_PRODUCTS = `${products.MODULE_NAME}/${products.MUTATION_SET_PRODUCTS}`;
export const PRODUCTS_SET_SEARCH = `${products.MODULE_NAME}/${products.MUTATION_SET_SEARCH}`;
export const PRODUCTS_SET_SHOW_FILTER = `${products.MODULE_NAME}/${products.MUTATION_SET_SHOW_FILTER}`;
export const PRODUCTS_TOGGLE_SHOW_FILTER = `${products.MODULE_NAME}/${products.MUTATION_TOGGLE_SHOW_FILTER}`;

export default {
    APP_SET_LOADING,
    APP_SET_DRAWER,
    APP_SET_IMAGE,
    APP_SET_COLOR,
    APP_TOGGLE_DRAWER,
    APP_SET_TOASTR,
    APP_SET_PROGRESS_BAR,
    APP_TOGGLE_PROGRESS_BAR,
    PRODUCTS_SET_PRODUCTS,
    PRODUCTS_SET_SEARCH,
    PRODUCTS_SET_SHOW_FILTER,
    PRODUCTS_TOGGLE_SHOW_FILTER,
}