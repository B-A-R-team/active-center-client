/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-15 15:15:10
 * @FilePath: \大学生创业基地管理项目\active-center-client\babel.config.js
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}
