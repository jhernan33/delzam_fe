const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: '159.223.168.118',
    //host: '192.168.0.101',
    //host: '172.16.0.7',
    port: 7500,
  },
})
