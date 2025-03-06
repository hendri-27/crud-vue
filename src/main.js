import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import VueFormulate from '@braid/vue-formulate'

Vue.config.productionTip = false

Vue.use(VueFormulate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
