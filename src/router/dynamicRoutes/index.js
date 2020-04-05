import asyncRoutesMap from './asyncRoutesMap'
const Page404 = () => import('@/views/Page404.vue')

// 基础的动态路由，带有通配符 * 的路由应该始终放置在路由表的最后面，会拼接到验权生成的动态路由后面
const asyncRoutesBase = [
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
    meta: {
      base: true,
      title: '404',
      requiresAuth: false
    }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      base: true,
      title: '404',
      requiresAuth: false
    }
  }
]

// 对后台返回的动态路由 component 属性实体化工具函数
const formatAsyncRoute = (asyncRoutes) => {
  asyncRoutes.forEach(asyncRoute => {
    if (asyncRoute.component) {
      if (asyncRoutesMap[asyncRoute.component]) {
        asyncRoute.component = asyncRoutesMap[asyncRoute.component]
      } else {
        delete asyncRoute.component
      }
    }
    if (asyncRoute.children) {
      formatAsyncRoute(asyncRoute.children)
    }
  })
}

export {
  asyncRoutesMap,
  formatAsyncRoute,
  asyncRoutesBase
}
