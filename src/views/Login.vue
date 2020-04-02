<template>
  <div class="login">
    <img alt="Vue logo" src="@/assets/img/logo.png">
    <div>
      <p>authority vue Router</p>
      <p>vue Router 路由权限控制</p>
      <p>选择对应的用户类型查看对应的权限路由</p>
      <div style="width: 500px;margin: 0 auto;text-align: left;">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名:fxss"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码:123456"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" prop="type">
            <el-select v-model="form.type" placeholder="请选择用户类型:测试类型">
              <el-option v-for="item in authorType" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data () {
    return {
      authorType: [
        {
          label: '普通用户',
          value: 2
        },
        {
          label: 'vip用户',
          value: 1
        },
        {
          label: '管理员',
          value: 0
        }
      ],
      form: {
        name: '',
        password: '',
        type: 2
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名:fxss', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码:123456', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择用户类型:测试类型', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login () {
      const res = await this.$axios.post('/api/authorityRouter/login', this.form)
      if (res.status && res.status === 200) {
        if (res.data.isok) {
          this.$store.commit('setLoginFlag', true)
          this.$store.commit('setAuthorityType', this.form.type)
          this.$cookies.set('authorityRouterType', this.form.type, { expires: 7, path: '' })
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/')
          }
        } else {
          this.$message.error('登录失败')
        }
      } else {
        this.$message.error('网络出错，请重试')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 60px;
}
</style>
