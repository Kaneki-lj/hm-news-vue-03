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
      <div class="right" @click="$router.push('/login')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
    <!-- tab栏 -->
    <van-tabs v-model="active" sticky>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.index">
      </van-tab>
      <hm-post :post="post" v-for="post in postList" :key="post.id"></hm-post>
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
    }
  },
  watch: {
    active(newActive) {
      this.getPostList(this.tabList[this.newActive])
    }
  },
  created() {
    this.getTabsList()
  },
  methods: {
    async getTabsList() {
      let res = await this.$axios.get('/category')
      if (res.data.statusCode === 200) {
        this.tabList = res.data.data
        this.getPostList(this.tabList[this.active].id)
      }
    },
    async getPostList(id) {
      let res = await this.$axios.get('/post', {
        params: {
          category: id,
        },
      })
      if (res.data.statusCode === 200) {
        this.postList = res.data.data
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .van-tabs__nav {
  background: #ddd;
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
