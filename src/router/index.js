/*
 * @Author: lts
 * @Date: 2021-01-15 12:46:41
 * @LastEditTime: 2021-03-02 10:58:42
 * @FilePath: \active-center-client\src\router\index.js
 */
import { createRouter,createWebHashHistory } from 'vue-router'
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
    redirect: '/admin/userInfo',
    children: [
      {
        path: '/admin/signIn',
        redirect: '/admin/signIn/personSignIn',
      },
      {
        path: '/admin/signIn/teamSignIn',
        name: 'TeamSignIn',
        component: () => import('../views/admin/signIn/teamSignIn/TeamSignIn.vue'),
      },
      {
        path: '/admin/signIn/allSignIn',
        name: 'AllSignIn',
        component: () => import('../views/admin/signIn/allSignIn/AllSignIn.vue'),
      },
      {
        path: '/admin/signIn/personSignIn',
        name: 'PersonSignIn',
        component: () => import('../views/admin/signIn/personSignIn/PersonSignIn.vue'),
      },
      {
        path: '/admin/userInfo',
        name: 'UserInfo',
        component: () => import('../views/admin/userInfo/UserInfo.vue')
      },
      {
        path: '/admin/usersManage',
        name: 'UsersManage',
        component: () => import('../views/admin/usersManage/UsersManage.vue')
      },
    ]
  }

]


const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = window.localStorage.getItem('token')
  if (to.name === 'Login' && token) {
    return next({ name: 'Admin' });
  }
  if (to.name !== 'Login' && !token && to.name !== 'Index') next({ name: 'Login' });
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
