/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-17 12:02:13
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
     Carousel,
     Divider,
     Card,
     BackTop
 } from 'ant-design-vue';
import 'normalize.css'
import './views/global.less'

const app = createApp(App);
app.config.productionTip = false;

app.use(Button);
app.use(Layout);
app.use(Row)
app.use(Col)
app.use(Menu);
app.use(Carousel);
app.use(Breadcrumb);
app.use(Avatar);
app.use(Divider);
app.use(Card);
app.use(BackTop);

app.use(router)
app.mount('#app')
