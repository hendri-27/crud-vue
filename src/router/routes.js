import auth from './allRouters/auth'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home Page',
    meta: {
      authRequired: true,
      beforeResolve(_, from, next) {
        if (store.state.credential.token === null) {
          next({ name: 'Login Page'})
        }
      }
    },
    component: () => import('@/router/views/HomeView.vue')
  },
  {
    path: '/',
    name: 'Profile Page',
    meta: {
      authRequired: true,
      beforeResolve(_, from, next) {
        if (store.state.credential.token === null) {
          next({ name: 'Login Page'})
        }
      }
    },
    component: () => import('@/router/views/ProfileView.vue')
  },
  ...auth,
]

export default routes