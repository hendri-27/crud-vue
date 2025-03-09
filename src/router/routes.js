import auth from './allRouters/auth'
import Cookies from 'js-cookie'

const routes = [
  {
    path: '/home/',
    name: 'Landing Page',
    redirect: { name: 'Home Page' },
  },
  {
    path: '/',
    name: 'Home Page',
    meta: {
      authRequired: true,
      beforeResolve(_, from, next) {
        if (!Cookies.get('resource')) {
          next({ name: 'Login Page'})
        } else {
          next()
        }
      }
    },
    component: () => import('@/router/views/home/HomeView.vue')
  },
  ...auth,
]

export default routes