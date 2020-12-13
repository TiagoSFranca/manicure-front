export const INDEX = { name: "index", path: '/' };
export const DASHBOARD = { name: "dashboard", path: '/dashboard' };

export const PRODUCTS = { name: "products_index", path: "/products" }
export const PRODUCTS_EDIT = { name: "products_edit", path: `${PRODUCTS.path}/edit/:id` };
export const PRODUCTS_DETAILS = { name: "products_details", path: `${PRODUCTS.path}/details/:id` };

export const COMBOS = { name: "combos_index", path: "/combos" }
export const COMBOS_EDIT = { name: "combos_edit", path: `${COMBOS.path}/edit/:id` };
export const COMBOS_DETAILS = { name: "combos_details", path: `${COMBOS.path}/details/:id` };

export const MATERIALS = { name: "materials_index", path: "/materials" }
export const MATERIALS_EDIT = { name: "materials_edit", path: `${MATERIALS.path}/edit/:id` };
export const MATERIALS_DETAILS = { name: "materials_details", path: `${MATERIALS.path}/details/:id` };

export const AGENDA = { name: "agenda_index", path: "/agenda" }

export const CLIENTS = { name: "clients_index", path: "/clients" }
export const CLIENTS_EDIT = { name: "clients_edit", path: `${CLIENTS.path}/edit/:id` };
export const CLIENTS_DETAILS = { name: "clients_details", path: `${CLIENTS.path}/details/:id` };

export const SCHEDULES = { name: "schedules_index", path: "/schedules" }
export const SCHEDULES_ADD = { name: "schedules_add", path: "/schedules/add" }

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

  AGENDA,

  CLIENTS,
  CLIENTS_EDIT,
  CLIENTS_DETAILS,

  SCHEDULES,
  SCHEDULES_ADD,
}