import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('../views/Login.vue')

Vue.use(VueRouter)

// 公共路由，和路由白名单里的路由信息一致
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

// 生成信息的公共路由
const createRouter = () => new VueRouter({
  routes: publicRoutes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

const router = createRouter()

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
