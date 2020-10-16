<template>
  <div>
    <hm-header>我的跟帖</hm-header>
    <!-- 列表页 -->
    <van-list
      class="list"
      @load="onLoad"
      offset="50"
      finished-text="我是有底线的"
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
    >
      <div class="item" v-for="item in list" :key="item.id">
        <div class="date">{{ item.creat_date | date('YYYY-MM-YY hh:mm') }}</div>
        <!-- 父评论的内容 -->
        <div class="parent" v-if="item.parent">
          <div class="parent-nickname">
            回复： {{ item.parent.user.nickname }}
          </div>
          <div class="parent-content">{{ item.parent.content }}</div>
        </div>
        <!-- 我的内容 -->
        <div class="content">{{ item.content }}</div>
        <!-- 原文 -->
        <div class="post">
          <div class="title line1">原文：{{ item.post.title }}</div>
          <i class="iconfont iconjiantou1"></i>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
    }
  },
  created() {
    this.getCommentList()
  },
  methods: {
    async getCommentList() {
      let res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      if (res.data.statusCode === 200) {
        // this.list = res.data.data
        this.list = [...this.list, ...res.data.data]
        this.loading = false
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log('触底了 数据加载中')
      this.pageIndex++
      this.getCommentList()
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  .item {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .date {
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    .parent {
      background: #eee;
      padding: 10px;
      color: #666;
      line-height: 20px;

      .parent-nickname {
        height: 25px;
        line-height: 25px;
      }
    }
    .content {
      font-size: 14px;
      padding: 10px 0;
    }
    .post {
      color: #999;
      display: flex;
      margin-top: 10px;
      .title {
        flex: 1;
      }

      .iconjiantou1 {
        width: 50px;
        text-align: right;
      }
    }
  }
}
</style>
