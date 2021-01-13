export const INDEX = { name: "index", path: '/' };
export const DASHBOARD = { name: "dashboard", path: '/dashboard' };

export const PRODUCTS = { name: "products_index", path: "/products", icon: "mdi-cube-outline" }
export const PRODUCTS_EDIT = { name: "products_edit", path: `${PRODUCTS.path}/edit/:id` };
export const PRODUCTS_DETAILS = { name: "products_details", path: `${PRODUCTS.path}/details/:id` };

export const COMBOS = { name: "combos_index", path: "/combos", icon: "mdi-cards-outline" }
export const COMBOS_EDIT = { name: "combos_edit", path: `${COMBOS.path}/edit/:id` };
export const COMBOS_DETAILS = { name: "combos_details", path: `${COMBOS.path}/details/:id` };

export const MATERIALS = { name: "materials_index", path: "/materials", icon: "mdi-hexagon-slice-1" }
export const MATERIALS_EDIT = { name: "materials_edit", path: `${MATERIALS.path}/edit/:id` };
export const MATERIALS_DETAILS = { name: "materials_details", path: `${MATERIALS.path}/details/:id` };

export const AGENDA = { name: "agenda_index", path: "/agenda" }

export const CLIENTS = { name: "clients_index", path: "/clients" }
export const CLIENTS_EDIT = { name: "clients_edit", path: `${CLIENTS.path}/edit/:id` };
export const CLIENTS_DETAILS = { name: "clients_details", path: `${CLIENTS.path}/details/:id` };

export const SCHEDULES = { name: "schedules_index", path: "/schedules", icon: "mdi-calendar-multiple" }
export const SCHEDULES_ADD = { name: "schedules_add", path: `${SCHEDULES.path}/add` }
export const SCHEDULES_DETAILS = { name: "schedules_details", path: `${SCHEDULES.path}/details/:id` }
export const SCHEDULES_FINISH = { name: "schedules_finish", path: `${SCHEDULES.path}/finish/:id` }

export const NOT_FOUND = { name: "not_found", path: "*" }
export const RESOURCE_NOT_FOUND = { name: "resource_not_found", path: "/not-found" }

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
  MATERIALS_EDIT,
  MATERIALS_DETAILS,

  AGENDA,

  CLIENTS,
  CLIENTS_EDIT,
  CLIENTS_DETAILS,

  SCHEDULES,
  SCHEDULES_ADD,
  SCHEDULES_DETAILS,
  SCHEDULES_FINISH,

  NOT_FOUND,
  RESOURCE_NOT_FOUND
}