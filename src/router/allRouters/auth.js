export default [
  {
    path: '/login',
    name: 'Login Page',
    meta: {
      beforeResolve(_, from, next) {
        if (store.state.credential.token !== null) {
          window.location.href = '/'
        } else {
          next()
        }
      }
    },
    component: () => import('@/router/views/account/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Profile Page',
    meta: {
      authRequired: true,
      beforeResolve(_, from, next) {
        if (store.state.credential.token !== null) {
          window.location.href = '/'
        } else {
          next()
        }
      }
    },
    component: () => import('@/router/views/account/RegisterView.vue')
  },
  {
    path: '/404/',
    name: '404',
    component: () => import('@/router/views/utility/404.vue')
  },
  {
    path: '*',
    redirect: '404'
  }
]