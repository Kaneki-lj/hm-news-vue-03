<template>
  <div>
    <!-- 头部 -->
    <hm-header>编辑资料</hm-header>
    <!-- 头像部分 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <!-- 列表部分 -->
    <van-cell-group>
      <van-cell
        title="昵称"
        :value="info.nickname"
        is-link
        @click="ShowNickname"
      />
      <van-cell title="密码" value="****" is-link />
      <van-cell
        title="性别"
        :value="info.gender === 1 ? '男' : '女'"
        is-link
        @click="ShowGender"
      />
    </van-cell-group>

    <!-- 修改昵称的对话框 -->
    <van-dialog
      v-model="isShowNickname"
      title="修改昵称"
      show-cancel-button
      @confirm="confirmNickname"
    >
      <van-field v-model="nickname" />
    </van-dialog>

    <!-- 修改性别的对话框 -->
    <van-dialog
      v-model="isShowGender"
      title="修改性别"
      show-cancel-button
      @confirm="confirmGender"
    >
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      isShowNickname: false, // 修改昵称对话框
      nickname: '',
      isShowGender: false, // 修改性别对话框
      gender: '',
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    // 发送axios请求 获取个人信息 渲染页面
    async getInfo() {
      let token = localStorage.getItem('token')
      let user_id = localStorage.getItem('user_id')
      let res = await this.$axios.get(`/user/${user_id}`)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        this.info = res.data.data
      }
    },
    // 显示昵称修改框
    ShowNickname() {
      // 点击后显示修改昵称对话框
      this.isShowNickname = true
      // 数据回显
      this.nickname = this.info.nickname
    },
    //点击确定按钮 修改昵称
    confirmNickname() {
      if (this.nickname === this.info.nickname) {
        this.$toast('亲, 修改前后昵称不可以一样喔')
        return
      }

      this.editUser({
        nickname: this.nickname,
      })
    },
    // 显示性别
    ShowGender() {
      this.isShowGender = true
      this.gender = this.info.gender
    },
    // 修改性别
    confirmGender() {
      // console.log(123)
      this.editUser({
        gender: this.gender,
      })
    },
    // 封装修改函数
    async editUser(data) {
      let token = localStorage.getItem('token')
      let user_id = localStorage.getItem('user_id')

      let res = await this.$axios.post(`/user_update/${user_id}`, data)
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        // 重新渲染页面
        this.getInfo()
        this.$toast.success(res.data.message)
      }
    },
    async afterRead(data) {
      // 使用formdata上传文件
      // console.log(data)
      let formdata = new FormData()
      formdata.append('file', data.file)
      // 发送第一次请求 把图片上传到后台 返回 url
      let res = await this.$axios.post('/upload', formdata)
      // console.log(res.data.data.url)
      //第二次请求 修改头像
      this.editUser({
        head_img: res.data.data.url,
      })
    },
  },
}
</script>

<style scoped lang="less">
.avatar {
  margin: 20px 0;
  text-align: center;
  position: relative;
  img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
  }

  .uploader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
}
</style>
