/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-15 16:31:54
 * @FilePath: \大学生创业基地管理项目\active-center-client\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
     Button,
     Layout,
     Menu,
     Row,
     Col
 } from 'ant-design-vue';
import 'normalize.css'

const app = createApp(App);
app.config.productionTip = false;

app.use(Button);
app.use(Layout);
app.use(Row)
app.use(Col)
app.use(Menu);
app.use(router)
app.mount('#app')
