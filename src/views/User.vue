<template>
  <div>
    <!--  头部 -->
    <hm-header>个人中心</hm-header>
    <!-- 信息部分 -->
    <div class="info">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
        <div></div>
      </div>
      <div class="center">
        <div class="nickname">{{ info.nickname }}</div>
        <div class="date">{{ info.create_date | date }}</div>
      </div>
    </div>
    <!-- 列表 -->
    <van-cell-group>
      <van-cell
        title="我的关注"
        is-link
        value="关注的用户"
        @click="$router.push('/my-follow')"
      />
      <van-cell
        title="我的跟帖"
        is-link
        value="跟帖/回复"
        @click="$router.push('/my-comment')"
      />
      <van-cell title="我的收藏" is-link value="文档/视频" />
      <van-cell title="设置" is-link @click="$router.push('/edit')" />
      <van-cell title="退出" @click="logout" is-link />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    }
  },
  created() {
    let token = localStorage.getItem('token')
    let user_id = localStorage.getItem('user_id')
    this.$axios.get(`/user/${user_id}`).then(res => {
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    })
  },
  methods: {
    async logout() {
      // console.log('点击退出了')
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出系统吗',
        })
        // 确定退出
        // 删除token 和 id
        localStorage.removeItem('token')
        localStorage.removeItem('use_id')

        // 提示退出功能
        this.$toast.success('退出成功')

        // 跳转到login
        this.$router.push('/login')
      } catch (error) {
        // on cancel
        this.$toast('取消退出')
      }
    },
  },
}
</script>

<style scoped lang="less">
.info {
  height: 130px;
  border-bottom: 2px solid #ccc;

  display: flex;
  padding: 0 50px;
  align-items: center;

  .left {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .center {
    flex: 1;
    padding-left: 20px;
    height: 50px;
    line-height: 25px;
  }
}
</style>
