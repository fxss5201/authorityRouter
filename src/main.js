import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Cookies from 'js-cookie'

Vue.config.productionTip = false
Vue.$cookies = Vue.prototype.$cookies = Cookies

// eslint-disable-next-line import/first
import '@/permission.js'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
