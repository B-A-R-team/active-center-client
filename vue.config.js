/*
 * @Author: lts
 * @Date: 2021-01-15 14:52:54
 * @LastEditTime: 2021-01-15 14:54:32
 * @FilePath: \大学生创业基地管理项目\active-center-client\vue.config.js
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
  };