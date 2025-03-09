import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import BootstrapVue from 'bootstrap-vue'

// import global styling
import '@/design/app.scss'

// import component 3rd party
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import FormulatePlugin from '@/plugins/VueFormulatePlugin'
import MyToastPlugin from './plugins/MyToastPlugin'
import Cookies from "js-cookie";

Vue.config.productionTip = false

Vue.use(Cookies)
Vue.use(BootstrapVue)
Vue.use(Toast)
Vue.use(MyToastPlugin)
Vue.use(FormulatePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
