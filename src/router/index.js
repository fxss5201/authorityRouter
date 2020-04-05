import Vue from 'vue'
import VueRouter from 'vue-router'
import { asyncRoutesBase } from '@/router/dynamicRoutes/index'
const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      requiresAuth: false
    }
  }
]

const createRouter = (flag) => {
  const routes = flag ? [...publicRoutes, ...asyncRoutesBase] : publicRoutes
  return new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}

const router = createRouter(true)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
export {
  publicRoutes,
  resetRouter
}
