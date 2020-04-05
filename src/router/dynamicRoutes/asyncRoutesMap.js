/**
* 该组件集合会配合后台返回的动态路由表，匹配有角色权限的 component
*/
export default {
  Admin: () => import('@/views/Admin.vue'),
  AdminBase: () => import('@/views/AdminBase.vue'),
  AdminVip: () => import('@/views/AdminVip.vue'),
  AdminAdmin: () => import('@/views/AdminAdmin.vue')
}
