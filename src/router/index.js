import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  const token = Cookies.get('resource')
  
  if (!authRequired) {
    if (['/login', '/register'].includes(routeTo.path) && token) {
      return next({ name: 'Home Page' })
    }

    return next()
  }

  if (!token) {
    // window.location.href = '/login'
    return next({ name: 'Login Page' })
  }

  next()
})

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args)
              reject(new Error('Redirected'))
            } else {
              resolve()
            }
          })
        } else {
          resolve()
        }
      })
    }
  } catch (error) {
    return
  }

  next()
})

export default router
