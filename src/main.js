/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-20 09:08:37
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
     BackTop,
     Form,
     Input,
     Table,
     Select,
     Tag,
     Tabs,
     Affix,
     Icon,
     DatePicker
 } from 'ant-design-vue';
import 'normalize.css'
import './views/global.less'
import * as echarts from 'echarts'

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
app.use(Form);
app.use(Input);
app.use(Table);
app.use(Select);
app.use(Tag);
app.use(Tabs);
app.use(Affix);
app.use(Icon);
app.use(DatePicker);

app.use(router)
app.mount('#app')


app.echarts=echarts