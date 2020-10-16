<template>
  <div>
    <hm-header>我的关注</hm-header>
    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="center">
          <div class="name">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div class="right" @click="unfollow(item.id)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    }
  },
  created() {
    this.getFollowList()
    // this.follow()
  },
  methods: {
    // 获取关注用户的列表
    async getFollowList() {
      let res = await this.$axios.get('/user_follows')
      // console.log(res.data)
      this.list = res.data.data
    },
    follow() {
      // 模拟增加关注的用户   id = 1(本身 不用) 2 3 4 5 6 ...
      this.$axios.get('/user_follows/8').then(res => {
        // console.log('关注用户',res.data);
        this.getFollowList()
      })
    },
    // 取消关注功能
    async unfollow(id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要取消关注用户吗',
        })
        // on confirm
        let res = await this.$axios.get(`/user_unfollow/${id}`)
        if(res.data.statusCode === 200) {
          this.$toast.success('取消成功')
          this.getFollowList()
        }
        
      } catch (error) {
        this.$toast('取消操作')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  height: 80px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    .name {
      font-size: 14px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }

  .right {
    height: 30px;
    line-height: 30px;
    background: #ddd;
    border-radius: 15px;
    padding: 0 15px;
    color: #000;
  }
}
</style>
