<template>
  <div>
    <!-- 头部 -->
    <hm-header>登录</hm-header>
    <!-- logo -->
    <hm-logo></hm-logo>
    <!-- 输入框 -->
    <van-field
      v-model="username"
      required
      label="用户名"
      placeholder="请输入用户名"
      clearable
      :error-message="usernameErrMsg"
      @input="checkUsername"
      @clear="clearUsername"
    />
    <van-field
      v-model="password"
      required
      label="密码"
      placeholder="请输入密码"
      clearable
      :error-message="passwordErrMsg"
      @input="checkPassword"
      @clear="clearPassword"
    />
    <!-- 按钮 -->
    <hm-button @click.native="startLogin">登录</hm-button>

    <p>没有账号 去 <router-link to="/register">注册</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      usernameErrMsg: '',
      password: '',
      passwordErrMsg: '',
    }
  },
  created() {
    // const { password, username } = this.$route.query
    const { password, username } = this.$route.params
    if (password && username) {
      this.password = password
      this.username = username
    }
  },
  methods: {
    // 登录按钮功能
    async startLogin() {
      if (
        this.username !== '' &&
        this.password !== '' &&
        this.usernameErrMsg === '' &&
        this.passwordErrMsg === ''
      ) {
        let res = await this.$axios.post(`/login`, {
          username: this.username,
          password: this.password,
        })

        const { statusCode, message, data } = res.data
        if (statusCode === 200) {
          // 保存token + id
          localStorage.setItem('user_id', data.user.id)
          localStorage.setItem('token', data.token)

          // 提示信息
          this.$toast.success(message)
          // 跳转
          this.$router.push('/user')
        } else {
          // 提示信息
          this.$toast.fail(message)
        }
      } else {
        this.$toast.loading('校验失败')
      }
    },
    // 校验用户名
    checkUsername() {
      const reg = /^1\d{2,5}$/
      if (reg.test(this.username)) {
        this.usernameErrMsg = ''
      } else {
        this.usernameErrMsg = '用户名格式错误'
      }
    },
    clearUsername() {
      this.usernameErrMsg = ''
    },

    // 校验密码
    checkPassword() {
      const reg = /^\d{3,12}$/
      if (reg.test(this.password.trim())) {
        this.passwordErrMsg = ''
      } else {
        this.passwordErrMsg = '密码格式错误'
      }
    },
    clearPassword() {
      this.passwordErrMsg = ''
    },
  },
}
</script>

<style scoped>
p {
  text-align: center;
}
</style>
