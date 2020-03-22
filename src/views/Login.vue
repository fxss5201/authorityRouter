<template>
  <div class="home">
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
  name: 'Home',
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
