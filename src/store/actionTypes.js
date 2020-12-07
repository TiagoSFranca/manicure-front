import app from './modules/app/constants'
import products from './modules/products/constants'
import materials from './modules/materials/constants'
import combos from './modules/combos/constants'
import clients from './modules/clients/constants'
import agenda from './modules/agenda/constants'

// APP
export const APP_LOADING = `${app.MODULE_NAME}/${app.ACTION_LOADING}`;

// PRODUCTS
export const PRODUCTS_SET_PRODUCTS = `${products.MODULE_NAME}/${products.ACTION_SET_PRODUCTS}`;

// MATERIALS
export const MATERIALS_SET_MATERIALS = `${materials.MODULE_NAME}/${materials.ACTION_SET_MATERIALS}`;

// COMBOS
export const COMBOS_SET_COMBOS = `${combos.MODULE_NAME}/${combos.ACTION_SET_COMBOS}`;

// CLIENTS
export const CLIENTS_SET_CLIENTS = `${clients.MODULE_NAME}/${clients.ACTION_SET_CLIENTS}`;

// AGENDA
export const AGENDA_SET_AGENDA = `${agenda.MODULE_NAME}/${agenda.ACTION_SET_AGENDA}`;

export default {
  APP_LOADING,
  PRODUCTS_SET_PRODUCTS,
  MATERIALS_SET_MATERIALS,
  COMBOS_SET_COMBOS,
  CLIENTS_SET_CLIENTS,
  AGENDA_SET_AGENDA
}