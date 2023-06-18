const {defineConfig} = require('@vue/cli-service')
const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/notebookApi': {
        target: `http://121.37.236.195:8080/`,
        changeOrigin: true,
        pathRewrite: {'^/notebookApi': ''},
      },
      '/localhost': {
        target: `http://localhost:8080`,
        changeOrigin: true,
        pathRewrite: {'^/localhost': ''},
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"))
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
})
