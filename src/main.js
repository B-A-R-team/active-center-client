/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-16 09:12:27
 * @FilePath: \active-center-client\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {
     Button,
     Layout,
     Menu,
     Row,
     Col,
     Breadcrumb,
     Avatar,
     Icon,
<<<<<<< HEAD
     DatePicker,
     Tabs
=======
     DatePicker
>>>>>>> dc4faa37259b69a4088053e7d5667b4fcc0fc8cd
 } from 'ant-design-vue';
import 'normalize.css'

const app = createApp(App);
app.config.productionTip = false;

app.use(Button);
app.use(Layout);
app.use(Row)
app.use(Col)
app.use(Menu);
app.use(Breadcrumb);
app.use(Avatar);
app.use(Icon);
app.use(DatePicker);
<<<<<<< HEAD
app.use(Tabs);
=======
>>>>>>> dc4faa37259b69a4088053e7d5667b4fcc0fc8cd

app.use(router)
app.mount('#app')
