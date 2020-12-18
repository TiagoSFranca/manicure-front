// Middlewares
import auth from '@/middleware/auth'
import guest from '@/middleware/guest'
import routes from './routes'

export default [
  {
    path: routes.INDEX.path,
    name: routes.INDEX.name,
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
    path: routes.DASHBOARD.path,
    name: routes.DASHBOARD.name,
    view: 'Dashboard',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.PRODUCTS.path,
    name: routes.PRODUCTS.name,
    view: 'products.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.PRODUCTS_EDIT.path,
    name: routes.PRODUCTS_EDIT.name,
    view: 'products.Edit',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.PRODUCTS_DETAILS.path,
    name: routes.PRODUCTS_DETAILS.name,
    view: 'products.Details',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.MATERIALS.path,
    name: routes.MATERIALS.name,
    view: 'materials.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.MATERIALS_EDIT.path,
    name: routes.MATERIALS_EDIT.name,
    view: 'materials.Edit',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.MATERIALS_DETAILS.path,
    name: routes.MATERIALS_DETAILS.name,
    view: 'materials.Details',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.AGENDA.path,
    name: routes.AGENDA.name,
    view: 'agenda.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.COMBOS.path,
    name: routes.COMBOS.name,
    view: 'combos.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.COMBOS_EDIT.path,
    name: routes.COMBOS_EDIT.name,
    view: 'combos.Edit',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.COMBOS_DETAILS.path,
    name: routes.COMBOS_DETAILS.name,
    view: 'combos.Details',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.CLIENTS.path,
    name: routes.CLIENTS.name,
    view: 'clients.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.SCHEDULES.path,
    name: routes.SCHEDULES.name,
    view: 'schedules.Index',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.SCHEDULES_ADD.path,
    name: routes.SCHEDULES_ADD.name,
    view: 'schedules.Add',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.SCHEDULES_DETAILS.path,
    name: routes.SCHEDULES_DETAILS.name,
    view: 'schedules.Details',
    meta: {
      middleware: guest
    }
  },
  {
    path: routes.SCHEDULES_FINISH.path,
    name: routes.SCHEDULES_FINISH.name,
    view: 'schedules.Finish',
    meta: {
      middleware: guest
    }
  },
]
