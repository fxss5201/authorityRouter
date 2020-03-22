import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')
const Admin = () => import('../views/Admin.vue')

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
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
export {
  routes
}
