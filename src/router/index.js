/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-15 21:18:03
 * @FilePath: \大学生创业基地管理项目\active-center-client\src\router\index.js
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/index/Index.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/login',
        name: 'Login',
        component: import('../views/login/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: import('../views/register/Register.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: import('../views/admin/index/Index.vue'),
    // redirect: '/index',
  }

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
