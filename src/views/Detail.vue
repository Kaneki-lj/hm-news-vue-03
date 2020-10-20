<template>
  <div class="detail">
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="right">
        <div v-if="detail.has_follow" class="follow" @click="unfollow">
          已关注
        </div>
        <div v-else class="follow" @click="follow">关注</div>
      </div>
    </div>
    <!-- 内容整体 -->
    <div class="container">
      <div class="title line2">
        {{ detail.title }}
      </div>
      <div class="user">
        <span>{{ detail.user.nickname }}</span>
        <span>{{ detail.create_date | date }}</span>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 图文 -->
        <div v-if="detail.type === 1" v-html="detail.content"></div>
        <!-- 视频 -->
        <video v-else :src="detail.content" controls></video>
      </div>
      <!-- 点赞 -->
      <div class="bottom">
        <div class="like" @click="like" :class="{ active: detail.has_like }">
          <i class="iconfont icondianzan"></i>
          <i>{{ detail.like_length }}</i>
        </div>
      </div>
    </div>
    <!-- 评论列表 -->
    <div class="comments">
      <hm-comment
        v-for="comment in commentList"
        :key="comment.id"
        :comment="comment"
      ></hm-comment>
    </div>
    <!-- 底部 发表评论 -->
    <div class="footer">
      <!-- input -->
      <div class="input" v-if="!isShow">
        <div class="left">
          <input type="text" placeholder="写跟帖" @focus="handleFocus" />
        </div>
        <div class="center">
          <van-icon name="chat-o" badge="9" />
        </div>
        <div class="right">
          <van-icon name="star-o" />
        </div>
      </div>
      <!-- textarea -->
      <div class="textarea" v-else >
        <textarea placeholder="马哥" @blur="handleBlur"></textarea>
        <div class="send">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        user: {}
      },
      commentList: [],
      isShow: false
    }
  },
  created() {
    this.getDetail()
    this.getCommentsList()
  },
  methods: {
    async getDetail() {
      let res = await this.$axios.get(`/post/${this.$route.params.id}`)
      if (res.data.statusCode === 200) {
        console.log('详情页', res.data.data)
        this.detail = res.data.data
      }
    },
    async unfollow() {
      let res = await this.$axios.get(`/user_unfollow/${this.detail.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast(res.data.message)
        this.getDetail()
      }
    },
    async follow() {
      // 判断token
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })
        return
      }
      // 请求
      let res = await this.$axios.get(`/user_follows/${this.detail.user.id}`)
      if (res.data.statusCode === 200) {
        //2. 提示
        this.$toast.success(res.data.message)
        // 重新渲染页面
        this.getDetail()
      }
    },
    async like() {
      // 判断token
      let token = localStorage.getItem('token')
      if (!token) {
        this.$toast('请先登录')
        this.$router.push({
          name: 'login',
          params: {
            back: true,
          },
        })
        return
      }
      // 请求
      let res = await this.$axios.get(`/post_like/${this.detail.id}`)
      if (res.data.statusCode === 200) {
        // 提示
        this.$toast.success(res.data.message)
        // 重新请求数据
        this.getDetail()
      }
    },
    async getCommentsList() {
      let res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
      if (res.data.statusCode === 200) {
        this.commentList = res.data.data
        // console.log('评论列表', commentList)
      }
    },
    //聚焦
    handleFocus() {
      this.isShow = true
    },
    // 失焦
    handleBlur() {
      this.isShow = false
    }
  },
}
</script>

<style scoped lang="less">
.header {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  .left {
    width: 30px;
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    i {
      font-size: 50px;
    }
  }
  .right {
    width: 60px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #999;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
}
.container {
  padding: 0 20px;
  border-bottom: 3px solid #999;
  .title {
    padding: 20px 0;
    font-size: 14px;
    font-weight: 700;
  }
  .user {
    color: #999;
    height: 40px;
    line-height: 10px;
    display: flex;
    span {
      margin-right: 10px;
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 20px 0;

    .like {
      width: 60px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #000;
      padding: 0 15px;
      border-radius: 15px;
      text-align: center;
      i {
        margin-right: 5px;
      }
    }
    .like.active {
      color: #f00;
      border: 1px solid #f00;
    }
  }
}
/deep/ img {
  width: 100%;
}
video {
  width: 100%;
}
.comments{
  padding-bottom: 40px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .input {
    border-top: 1px solid #000;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #fff;
    .left {
      input {
        height: 30px;
        width: 180px;
        background: #ddd;
        padding-left: 10px;
        outline: none;
        border: none;
        border-radius: 15px;
      }
    }
    .center,
    .right {
      font-size: 20px;
    }
  }
  .textarea {
    height: 70px;
    border-top: 1px solid #000;
    display: flex;
    padding: 20px;
    align-items: flex-end;
    textarea {
      background: #eee;
      border-radius: 5px;
      padding: 5px 10px;
      flex: 1;
      margin-right: 20px;
      height: 100%;
      resize: none;
    }
    .send {
      width: 50px;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      background: red;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
