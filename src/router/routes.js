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

export const CLIENTS = "/clients"
export const CLIENTS_EDIT = `${CLIENTS}/edit/:id`;
export const CLIENTS_DETAILS = `${CLIENTS}/details/:id`;

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

    CLIENTS,
    CLIENTS_EDIT,
    CLIENTS_DETAILS,

    SCHEDULES,
    SCHEDULES_ADD,
}