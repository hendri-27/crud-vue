import Cookies from 'js-cookie'

export default [
  {
    path: '/login',
    name: 'Login Page',
    meta: {
      beforeResolve(_, from, next) {
        if (Cookies.get('resource')) {
          window.location.href = '/'
        }
        next()
      }
    },
    component: () => import('@/router/views/account/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register Page',
    meta: {
      beforeResolve(_, from, next) {
        if (Cookies.get('resource')) {
          window.location.href = '/'
        }
        next()
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