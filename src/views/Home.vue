<template>
  <div class="home">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- 小三角 -->
    <van-sticky z-index="999">
      <div class="container" @click="$router.push('/tabsedit')">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </van-sticky> 
    <!-- tab栏 -->
    <van-tabs v-model="active" sticky>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.index">
      </van-tab>
      <van-pull-refresh
        v-model="isRefreshing"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
          finished-text="我是有底线滴~~~~~~~"
        >
          <hm-post
            :post="post"
            v-for="(post, index) in postList"
            :key="index"
            @click.native="$router.push(`/detail/${post.id}`)"
          ></hm-post>
        </van-list>
      </van-pull-refresh>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false,
      isRefreshing: false,
    }
  },
  watch: {
    active(newActive) {
      // console.log(newActive)
      // active发送改变 说明切换了tab
      // 1 处理之前的数据
      this.pageIndex = 1
      this.postList = []
      // 2 处理底部加载问题
      this.finished = false
      this.loading = true
      // 3 重新请求数据
      this.getPostList(this.tabList[newActive].id)
    },
  },
  created() {
    this.getTabsList()
  },
  methods: {
    async getTabsList() {
      let res = await this.$axios.get('/category')
      if (res.data.statusCode === 200) {
        this.tabList = res.data.data
        console.log('tabsList:', res.data.data)
        this.getPostList(this.tabList[this.active].id)
      }
    },
    async getPostList(id) {
      let res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        },
      })
      // console.log('文章列表', res.data.data)
      if (res.data.statusCode === 200) {
        // this.postList = res.data.data
        this.postList = [...this.postList, ...res.data.data]
        this.loading = false
        this.isRefreshing = false
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      console.log('触底了 加载更多数据')
      this.pageIndex++
      this.getPostList(this.tabList[this.active].id)
    },
    onRefresh() {
      // console.log('下拉 刷新了')
      setTimeout(() => {
        // 1 处理数据
        this.postList = []
        this.pageIndex = 1
        // 2 处理加载问题
        this.loading = true
        this.finished = false
        // 3 重新请求数据
        this.getPostList(this.tabList[this.active].id)
      }, 2000)
    },
    
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-tabs__nav {
  background: #ddd;
  margin-right: 40px;
}
.container {
  width: 40px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #ddd;
  position: absolute;
  right: 0;
  z-index: 999;
}
.header {
  height: 50px;
  background: #f00;
  color: #fff;

  display: flex;
  align-items: center;
  .left,
  .right {
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 24px;
  }

  .center {
    flex: 1;
    height: 34px;
    line-height: 34px;
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    border-radius: 17px;
    span {
      margin-left: 5px;
    }
  }
}
</style>
