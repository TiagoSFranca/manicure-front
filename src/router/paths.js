// Middlewares
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import routes from './routes'

export default [
  {
    path: routes.INDEX,
    name: 'Inicio',
    view: 'Dashboard',
    meta: {
      middleware: guest
    }
  },
  {
    path: '/login',
    view: 'Login',
    name: 'Login',
    meta: {
      middleware: guest
    }
  },
  {
    path: '/register',
    view: 'Register',
    name: 'Registrar',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.DASHBOARD,
    name: 'Dashboard',
    view: 'Dashboard',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.PRODUCTS,
    name: 'Produtos',
    view: 'products.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.PRODUCTS_EDIT,
    name: 'EditProduct',
    view: 'products.Edit',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.PRODUCTS_DETAILS,
    name: 'ProductDetails',
    view: 'products.Details',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.MATERIALS,
    name: 'Materiais',
    view: 'materials.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.AGENDA,
    name: 'Agenda',
    view: 'agenda.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.COMBOS,
    name: 'Combos',
    view: 'combos.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.COMBOS_EDIT,
    name: 'EditCombo',
    view: 'combos.Edit',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.COMBOS_DETAILS,
    name: 'ComboDetails',
    view: 'combos.Details',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.CLIENTS,
    name: 'Clientes',
    view: 'clients.Index',
    meta: {
      middleware: guest
    }
  },
]
