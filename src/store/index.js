import Vue from 'vue'
import Vuex from 'vuex'
import permission from './module/permission'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginFlag: false,
    authorityType: null
  },
  mutations: {
    setLoginFlag (state, val) {
      state.loginFlag = val
    },
    setAuthorityType (state, val) {
      state.authorityType = val
    }
  },
  actions: {},
  modules: {
    permission
  }
})
