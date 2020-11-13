import app from './modules/app/constants'
import products from './modules/products/constants'

// APP
export const APP_LOADING = `${app.MODULE_NAME}/${app.ACTION_LOADING}`;

// PRODUCTS
export const PRODUCTS_SET_PRODUCTS = `${products.MODULE_NAME}/${products.ACTION_SET_PRODUCTS}`;

export default {
    APP_LOADING,
    PRODUCTS_SET_PRODUCTS
}