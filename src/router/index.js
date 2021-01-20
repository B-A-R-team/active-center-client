/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-01-18 10:30:31
 * @FilePath: \active-center-client\src\router\index.js
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
        component: () => import('../views/login/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/register/Register.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/index/Index.vue'),
    redirect: '/admin/signIn',
    children: [
      {
        path: '/admin/signIn',
        name: 'SignIn',
        component: () => import('../views/admin/signIn/signIn.vue')
      },
      {
        path: '/admin/userInfo',
        name: 'UserInfo',
        component:() => import('../views/admin/userInfo/UserInfo.vue')
      },
      {
        path: '/admin/usersManage',
        name: 'UsersManage',
        component:() => import('../views/admin/usersManage/UsersManage.vue')
      },
    ]
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
