import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/index/Index.vue'
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

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
