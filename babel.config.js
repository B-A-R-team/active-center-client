/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-03-04 20:56:25
 * @FilePath: \active-center-client\babel.config.js
 */
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ],
    ...prodPlugins
  ]
  
}
