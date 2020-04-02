import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router, { asyncRouters } from './router'
import store from './store'
import './plugins/element.js'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.$cookies = Vue.prototype.$cookies = Cookies

console.log(asyncRouters)

router.beforeEach((to, from, next) => {
  if (Vue.$cookies.get('authorityRouterType') || Vue.$cookies.get('authorityRouterType') === 0) {
    store.commit('setLoginFlag', true)
    store.commit('setAuthorityType', Vue.$cookies.get('authorityRouterType'))
    store.dispatch('getRouter', Vue.$cookies.get('authorityRouterType'))
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.loginFlag) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
