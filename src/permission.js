import Vue from 'vue'
import router from './router'
import store from './store'

// 路由白名单，允许未登录的时候可以查看的路由
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 设置文章标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  // 获取cookies
  // 有cookies的时候就默认登录
  let authorityRouterType = Vue.$cookies.get('authorityRouterType')
  if (authorityRouterType && authorityRouterType * 1 >= 0) {
    authorityRouterType = authorityRouterType * 1
    store.commit('setLoginFlag', true)
    store.commit('setAuthorityType', authorityRouterType)
    // 处理的路由信息
    const asyncRoutes = !!store.state.permission.asyncRoutes.length
    if (asyncRoutes) {
      next()
    } else {
      // 当路由信息不存在的时候进行请求
      try {
        // 根据权限得到可用的路由信息
        const accessRoutes = await store.dispatch('permission/getRouter', authorityRouterType)
        router.addRoutes(accessRoutes)
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      } catch (error) {
        Vue.prototype.$message.error('获取路由失败')
        if (!whiteList.includes(to.path)) {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 当未登录的时候，当前路由在白名单中直接 next ，否则跳转回登录页面，并携带路由path
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
