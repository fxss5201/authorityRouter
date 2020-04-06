<template>
  <div class="admin">
    <el-container>
      <el-header>
        <div class="flex header">
          <div class="logo">当前登录用户类型：{{ authorityTypeText }}</div>
          <el-button plain @click="logout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="150px">
           <el-menu
            :default-active="menuActive"
            :router="true">
            <el-menu-item v-for="item in menuRoutes" :key="item.name" :route="`/${item.path}`" :index="item.name">
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  data () {
    return {
      menuActive: '1'
    }
  },
  computed: {
    ...mapState(['authorityType']),
    ...mapState('permission', ['asyncRoutes', 'accessedRoutes']),
    menuRoutes () {
      if (this.accessedRoutes.length) {
        // 这里请根据具体情况定
        return this.accessedRoutes[0].children
      } else {
        return []
      }
    },
    authorityTypeText () {
      let res
      switch (this.authorityType) {
        case 0:
          res = '管理员'
          break
        case 1:
          res = 'vip用户'
          break
        case 2:
          res = '普通用户'
          break
        default:
          res = '普通用户'
          break
      }
      return res
    }
  },
  watch: {
    '$route.path' (val) {
      this.menuActive = this.$route.name
    }
  },
  created () {
    this.menuActive = this.$route.name
  },
  methods: {
    logout () {
      this.$store.commit('setLoginFlag', false)
      this.$store.commit('setAuthorityType', null)
      this.$cookies.remove('authorityRouterType', { path: '' })
      this.$store.dispatch('permission/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  justify-content: space-between;
  .logo {
    line-height: 60px;
  }
}
</style>
