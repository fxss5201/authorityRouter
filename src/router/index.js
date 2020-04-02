import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')
const Admin = () => import('../views/Admin.vue')
const AdminBase = () => import('../views/AdminBase.vue')
const AdminVip = () => import('../views/AdminVip.vue')
const AdminAdmin = () => import('../views/AdminAdmin.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true
    },
    redirect: '/base',
    children: [
      {
        path: 'base',
        name: 'AdminBase',
        component: AdminBase,
        meta: {
          requiresAuth: true,
          authority: 2
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const asyncRouters = [
  {
    path: 'vip',
    name: 'AdminVip',
    component: AdminVip,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: 'admin',
    name: 'AdminAdmin',
    component: AdminAdmin,
    meta: {
      requiresAuth: true
    }
  }
]

export default router
export {
  routes,
  asyncRouters
}
