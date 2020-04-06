import Vue from 'vue'
import { resetRouter } from '@/router/index'
import { formatAsyncRoute, asyncRoutesBase } from '@/router/dynamicRoutes/index'

/**
 * Use meta.role to determine if the current user has permission
 */
function hasPermission (role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  }
}

/**
 * 对路由进行筛选
 */
export function filterAsyncRoutes (routes, role) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(role, tmp)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, role)
      } else {
        tmp.children = null
      }
      res.push(tmp)
    } else if (tmp.meta && route.meta.base) {
      res.push(tmp)
    }
  })
  return res
}

export default {
  namespaced: true,
  state: {
    asyncRoutes: [],
    accessedRoutes: []
  },
  mutations: {
    setAsyncRoutes (state, asyncRoutes) {
      asyncRoutes = [asyncRoutes]
      formatAsyncRoute(asyncRoutes)
      // 将基础路由添加进去
      state.asyncRoutes = asyncRoutes.concat(asyncRoutesBase)
    },
    setAccessedRoutes (state, accessedRoutes) {
      state.accessedRoutes = accessedRoutes
    },
    resetAsyncRoutes (state) {
      state.asyncRoutes = []
    }
  },
  actions: {
    async getRouter ({ commit, state }, type) {
      // 根据用户类型获取路由信息
      const res = await Vue.axios.post('/api/authorityRouter/getRouter', {
        type
      })
      if (res.status && res.status === 200) {
        if (res.data.isok) {
          commit('setAsyncRoutes', res.data.data)
          return new Promise(resolve => {
            let accessedRoutes
            // 这里 type = 0 表示管理员
            if (type === 0) {
              accessedRoutes = state.asyncRoutes || {}
            } else {
              accessedRoutes = filterAsyncRoutes(state.asyncRoutes, type)
            }
            commit('setAccessedRoutes', accessedRoutes)
            resolve(accessedRoutes)
          })
        } else {
          Vue.prototype.$message.error('获取路由失败')
        }
      } else {
        Vue.prototype.$message.error('网络出错，请重试')
      }
    },
    logout ({ commit, state }) {
      // 退出登录
      resetRouter()
      commit('resetAsyncRoutes')
      commit('setAccessedRoutes', [])
    }
  }
}
