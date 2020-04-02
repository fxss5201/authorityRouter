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
            <el-menu-item index="1" route="/base">
              <span slot="title">基本</span>
            </el-menu-item>
            <el-menu-item index="2" route="/vip">
              <span slot="title">VIP</span>
            </el-menu-item>
            <el-menu-item index="3" route="/admin">
              <span slot="title">管理员</span>
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
      this.menuActive = this.getmenuActive()
    }
  },
  created () {
    this.menuActive = this.getmenuActive()
  },
  methods: {
    getmenuActive () {
      let res
      switch (this.$route.path) {
        case '/base':
          res = '1'
          break
        case '/vip':
          res = '2'
          break
        case '/admin':
          res = '3'
          break
        default:
          res = '1'
          break
      }
      return res
    },
    logout () {
      this.$store.commit('setLoginFlag', false)
      this.$store.commit('setAuthorityType', null)
      this.$cookies.remove('authorityRouterType', { path: '' })
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
