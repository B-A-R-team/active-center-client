/*
 * @Author: lts
 * @Date: 2021-01-15 14:52:54
 * @LastEditTime: 2021-03-04 21:50:48
 * @FilePath: \active-center-client\vue.config.js
 */
module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#f5222d',
            'link-color': '#f5222d',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
  },
  publicPath:'./'
};