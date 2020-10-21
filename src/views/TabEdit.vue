<template>
  <div class="tabedit">
    <hm-header>栏目管理</hm-header>
    <div class="tab-edit">
      <!-- 头部 -->
      <!-- 删除 -->
      <div class="title">点击删除一下频道</div>
      <div class="list">
        <div class="item" v-for="tab in activeTabs" :key="tab.id">
          <div @click="del(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
      <!-- 添加 -->
      <div class="title">点击添加一下频道</div>
      <div class="list">
        <div class="item" v-for="tab in deactiveTabs" :key="tab.id">
          <div @click="add(tab.id)">{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabs: [],
      deactiveTabs: [],
    }
  },
  watch: {
    activeTabs(newVal) {
      localStorage.setItem('activeTabs',JSON.stringify(newVal))
      localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
    }
  },
  created() {
    this.getActive()
  },
  methods: {
    async getActive() {
      let activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      let deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
      if(activeTabs && deactiveTabs ) {
        this.activeTabs = activeTabs
        this.deactiveTabs = deactiveTabs
        return
      }

      let res = await this.$axios.get(`/category`)
      if (res.data.statusCode === 200) {
        this.activeTabs = res.data.data
      }
    },
    // 删除
    del(id) {
      // console.log(id)
      // 根据id找到对应的tab
      let tab = this.activeTabs.find(v => v.id == id)
      // 下面添加
      this.deactiveTabs.push(tab)
      // 上面删除
      this.activeTabs = this.activeTabs.filter(v => v.id !== id)
    },
    // 添加
     add(id) {
      // 根据id找到对应的tab
      let tab = this.deactiveTabs.find(v => v.id == id)
      // 上面添加
      this.activeTabs.push(tab)
      // 下面删除
      this.deactiveTabs = this.deactiveTabs.filter(v => v.id !== id)
    },
  },
}
</script>

<style lang="less" scoped>
.tab-edit {
  padding: 20px;
  .title {
    height: 30px;
    line-height: 30px;
    color: #000;
    font-weight: 700;
    font-size: 14px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .item {
      width: 20%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        background: #ccc;
        width: 80%;
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
