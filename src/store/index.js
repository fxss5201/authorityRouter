import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginFlag: false
  },
  mutations: {
    setLoginFlag (state, val) {
      state.loginFlag = val
    }
  },
  actions: {
  },
  modules: {
  }
})
