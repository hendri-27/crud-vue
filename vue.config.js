const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  publicPath: '/',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "bootstrap/scss/variables";
          @import "@/design/variables";
        `
      }
    }
  }
})
