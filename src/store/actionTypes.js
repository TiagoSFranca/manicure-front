import app from './modules/app/constants'
import products from './modules/products/constants'
import materials from './modules/materials/constants'
import combos from './modules/combos/constants'
import clients from './modules/clients/constants'
import agenda from './modules/agenda/constants'
import address from './modules/address/constants'

// APP
export const APP_LOADING = `${app.MODULE_NAME}/${app.ACTION_LOADING}`;
export const APP_ADD_CANCEL_TOKEN = `${app.MODULE_NAME}/${app.ACTION_ADD_CANCEL_TOKEN}`;
export const APP_CANCEL_ALL_PENDING_REQUEST = `${app.MODULE_NAME}/${app.ACTION_CANCEL_APP_PENDING_REQUEST}`;
export const APP_CANCEL_PENDING_REQUEST = `${app.MODULE_NAME}/${app.ACTION_CANCEL_PENDING_REQUEST}`;

// PRODUCTS
export const PRODUCTS_SET_PRODUCTS = `${products.MODULE_NAME}/${products.ACTION_SET_PRODUCTS}`;
export const PRODUCTS_SET_ON_SALE_PRODUCTS = `${products.MODULE_NAME}/${products.ACTION_SET_ON_SALE_PRODUCTS}`;
export const PRODUCTS_SET_SCHEDULES = `${products.MODULE_NAME}/${products.ACTION_SET_SCHEDULES}`;
export const PRODUCTS_SET_SALES = `${products.MODULE_NAME}/${products.ACTION_SET_SALES}`;

// MATERIALS
export const MATERIALS_SET_MATERIALS = `${materials.MODULE_NAME}/${materials.ACTION_SET_MATERIALS}`;
export const MATERIALS_SET_WARNING_STOCK_MATERIALS = `${materials.MODULE_NAME}/${materials.ACTION_SET_WARNING_STOCK_MATERIALS}`;
export const MATERIALS_SET_MATERIAL_STOCKS = `${materials.MODULE_NAME}/${materials.ACTION_SET_MATERIAL_STOCKS}`;

// COMBOS
export const COMBOS_SET_COMBOS = `${combos.MODULE_NAME}/${combos.ACTION_SET_COMBOS}`;
export const COMBOS_SET_ON_SALE_COMBOS = `${combos.MODULE_NAME}/${combos.ACTION_SET_ON_SALE_COMBOS}`;
export const COMBOS_SET_SCHEDULES = `${combos.MODULE_NAME}/${combos.ACTION_SET_SCHEDULES}`;
export const COMBOS_SET_SALES = `${combos.MODULE_NAME}/${combos.ACTION_SET_SALES}`;

// CLIENTS
export const CLIENTS_SET_CLIENTS = `${clients.MODULE_NAME}/${clients.ACTION_SET_CLIENTS}`;
export const CLIENTS_SET_SCHEDULES = `${clients.MODULE_NAME}/${clients.ACTION_SET_SCHEDULES}`;

// ADDRESS
export const ADDRESS_SET_CITIES = `${address.MODULE_NAME}/${address.ACTION_SET_CITIES}`;

// AGENDA
export const AGENDA_SET_AGENDA = `${agenda.MODULE_NAME}/${agenda.ACTION_SET_AGENDA}`;
export const AGENDA_SET_LATE_SCHEDULES = `${agenda.MODULE_NAME}/${agenda.ACTION_SET_LATE_SCHEDULES}`;

export default {
  APP_LOADING,
  APP_ADD_CANCEL_TOKEN,
  APP_CANCEL_ALL_PENDING_REQUEST,
  APP_CANCEL_PENDING_REQUEST,

  PRODUCTS_SET_PRODUCTS,
  PRODUCTS_SET_ON_SALE_PRODUCTS,
  PRODUCTS_SET_SCHEDULES,
  PRODUCTS_SET_SALES,

  MATERIALS_SET_MATERIALS,
  MATERIALS_SET_WARNING_STOCK_MATERIALS,
  MATERIALS_SET_MATERIAL_STOCKS,

  COMBOS_SET_COMBOS,
  COMBOS_SET_ON_SALE_COMBOS,
  COMBOS_SET_SCHEDULES,
  COMBOS_SET_SALES,

  CLIENTS_SET_CLIENTS,
  CLIENTS_SET_SCHEDULES,

  ADDRESS_SET_CITIES,

  AGENDA_SET_AGENDA,
  AGENDA_SET_LATE_SCHEDULES
}