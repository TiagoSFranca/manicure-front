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
    path: '/pets',
    name: 'Pets',
    view: 'Pets',
    meta: {
      middleware: auth
    },
    children: [
      {
        path: '/',
        name: 'Todos',
        view: 'pets.Todos',
        meta: {
          middleware: auth
        }
      },
      {
        path: 'meus-pets',
        name: 'Meus Pets',
        view: 'pets.MeusPets',
        meta: {
          middleware: auth
        }
      }
    ]
  },
  {
    path: '/pets/:id',
    name: 'Pet',
    view: 'pets.Info',
    meta: {
      middleware: auth
    }
  },
  {
    path: '/solicitacoes-pet',
    name: 'Solicitações Pet',
    view: 'Solicitacoes-Pet',
    meta: {
      middleware: auth
    },
    children: [
      {
        path: '/',
        name: 'Enviadas',
        view: 'solicitacoesPet.Enviadas',
        meta: {
          middleware: auth
        }
      },
      // {
      //   path: 'recebidas',
      //   name: 'Recebidas',
      //   view: 'solicitacoesPet.Recebidas',
      //   meta: {
      //     middleware: auth
      //   }
      // }
    ]
  },
]
