/*
 * @Author: lts
 * @Date: 2021-01-15 14:52:54
 * @LastEditTime: 2021-01-25 11:51:08
 * @FilePath: \active-center-client\vue.config.js
 */
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
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
  }
};