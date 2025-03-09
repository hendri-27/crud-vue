import VueFormulate from '@braid/vue-formulate'

export default {
  install(Vue) {
    Vue.use(VueFormulate, {
      rules: {
        matches: ({ getFormValues, value }, args) => {
          if (!args) {
            throw new Error('need other value to be compared')
          }
          const otherValue = getFormValues()[args]
          
          return value === otherValue
        }
      },
      locales: {
        en: {
          matches: ({ name }) => `${name} is not same like password`
        }
      }
    })
  }
}