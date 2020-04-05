import Vue from 'vue'
import router from './router'
import store from './store'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // set page title
  document.title = to.meta.title
  let authorityRouterType = Vue.$cookies.get('authorityRouterType')
  if (authorityRouterType && authorityRouterType * 1 >= 0) {
    authorityRouterType = authorityRouterType * 1
    store.commit('setLoginFlag', true)
    store.commit('setAuthorityType', authorityRouterType)
    const asyncRoutes = !!store.state.permission.asyncRoutes.length
    if (asyncRoutes) {
      next()
    } else {
      try {
        // generate accessible routes map based on roles
        const accessRoutes = await store.dispatch('permission/getRouter', authorityRouterType)
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)
        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true })
      } catch (error) {
        Vue.prototype.$message.error('获取路由失败')
        if (to.path !== '/login') {
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      Vue.$cookies.set('authorityRouterType', -1, { expires: 7, path: '' })
      if (to.path !== '/login') {
        next(`/login?redirect=${to.path}`)
      }
    }
  }
})
