<template>
  <div class="search">
    <!-- 头部 -->
    <div class="header">
      <div class="left" @click="$router.back()">
        <i class="iconfont iconjiantou2"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input
          type="text"
          placeholder="请输入搜索的内容"
          v-model="keyword"
          @keyup.enter="search"
          @input="search_recommend"
        />
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <!-- 搜索推荐 -->
    <div class="recommend" v-if="recommendList.length">
        <div v-for="item in recommendList" :key="item.id">{{ item.title }}</div>
    </div>
    <!-- 搜索文章 -->
    <div v-else-if="postList.length">
      <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
    </div>
    <!-- 历史记录和热门搜索 -->
    <div class="history" v-else>
      <!-- 历史记录 -->
      <div class="title">历史记录</div>
      <div class="list">
        <div class="item" v-for="item in historyList" :key="item" @click="click_history(item)">{{ item }}</div>
      </div>
      <!-- 热门搜索 -->
      <div class="title">热门搜索</div>
      <div class="list">
        <div class="item" v-for="hot in hotList" :key="hot" @click="click_history(hot)">{{ hot }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '', // 关键字
      postList: [], // 文章列表
      historyList: [], // 历史记录
      hotList: ['肺炎', '新闻', '1', '美女', '关晓彤'],
      recommendList: []
    }
  },
  created() {
    // 进入页面后 先从本地获取
    let historyList = JSON.parse(localStorage.getItem('history_list'))
    if (historyList) {
      this.historyList = historyList
    }
    // 处理防抖函数
    this.search_recommend = _.debounce(this.search_recommend, 500)
  },
  watch: {
    // 监听关键字的变化
    keyword(newVal) {
      if (!newVal) {
        this.postList = [] // 如果没有关键字 搜索结果清空
        this.recommendList = []
      }
    },
  },
  methods: {
    // 搜索功能
    async search() {
      // 非空
      if (this.keyword.trim() === '') return

      // // 判断 如果没有数据 提示当前无数据
      // if(!this.postList){
      //   this.$toast('亲， 暂时没有数据哦')
      // }

      // 把关键字添加到历史记录
      this.historyList.unshift(this.keyword)
      // 先去重
      this.historyList = [...new Set(this.historyList)]
      // 后保存到本地
      localStorage.setItem('history_list', JSON.stringify(this.historyList))

      

      // 发送请求
      let res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword,
        },
      })
      console.log('搜索列表', res.data.data)
      if (res.data.statusCode === 200) {
        this.postList = res.data.data
      }
    },
    // 将历史记录回显到文本框 然后搜索
    click_history(item) {
      this.keyword = item
      this.search()
    },
    // 搜索推荐功能
    async search_recommend() {
      if(this.keyword.trim() === '') return
      let res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      // console.log('搜索推荐', res.data.data)
      if(res.data.statusCode === 200) {
        this.recommendList = res.data.data
      }
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  padding: 0 10px;
  .left,
  .right {
    width: 50px;
  }
  .right {
    text-align: center;
  }
  .center {
    position: relative;
    flex: 1;
    input {
      height: 30px;
      width: 100%;
      border: none;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 15px;
      text-indent: 30px;
    }
    i {
      position: absolute;
      left: 10px;
      top: 6px;
    }
  }
}
.history {
  padding: 20px;
  .title {
    font-size: 16px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
  }
  .list {
    padding-top: 5px;
    display: flex;
    flex-wrap: wrap;
    .item {
      height: 30px;
      // width: 40px;
      padding: 0 10px;
      background: #ddd;
      text-align: center;
      line-height: 30px;
      margin-bottom: 10px;
      margin-right: 10px;
      color: #000;
    }
  }
}
.recommend{
  padding: 0 20px;
  
  div {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
  }
}
</style>
