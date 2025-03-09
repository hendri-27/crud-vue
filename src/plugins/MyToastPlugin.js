import { createToastInterface } from "vue-toastification"

export const myToastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
}

export const myToast = createToastInterface(myToastOptions)

export default {
  install(Vue) {
    Vue.prototype.$myToast = myToast
  }
}