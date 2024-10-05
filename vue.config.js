const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  configureWebpack: {
    output: {
      libraryTarget: 'system',
    },
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'public/images'),
      },
    },
    externals: ['@joacod/microfrontends-utility'],
  },
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 9002,
  },
  filenameHashing: false,
})
