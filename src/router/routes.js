export const INDEX = '/';
export const DASHBOARD = '/dashboard';

export const PRODUCTS = "/products"
export const PRODUCTS_EDIT = `${PRODUCTS}/edit/:id`;
export const PRODUCTS_DETAILS = `${PRODUCTS}/details/:id`;

export const COMBOS = "/combos"
export const COMBOS_EDIT = `${COMBOS}/edit/:id`;
export const COMBOS_DETAILS = `${COMBOS}/details/:id`;

export const MATERIALS = "/materials"

export const AGENDA = "/agenda"

export const CUSTOMERS = "/customers"

export const SCHEDULES = "/schedules"
export const SCHEDULES_ADD = "/schedules/add"

export default {
    INDEX,
    DASHBOARD,
    
    PRODUCTS,
    PRODUCTS_EDIT,
    PRODUCTS_DETAILS,

    COMBOS,
    COMBOS_EDIT,
    COMBOS_DETAILS,

    MATERIALS,

    AGENDA,

    CUSTOMERS,

    SCHEDULES,
    SCHEDULES_ADD,
}