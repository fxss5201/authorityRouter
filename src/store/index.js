import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginFlag: false,
    authorityType: null,
    routers: []
  },
  mutations: {
    setLoginFlag (state, val) {
      state.loginFlag = val
    },
    setAuthorityType (state, val) {
      state.authorityType = val
    },
    setRouters (state, val) {
      state.routers = val
    }
  },
  actions: {
    async getRouter ({ commit, state }, type) {
      const res = await Vue.axios.post('/api/authorityRouter/getRouter', {
        type
      })
      if (res.status && res.status === 200) {
        if (res.data.isok) {
          // const routers = res.data.data
        } else {
          Vue.prototype.$message.error('获取路由失败')
        }
      } else {
        Vue.prototype.$message.error('网络出错，请重试')
      }
    }
  },
  modules: {
  }
})
