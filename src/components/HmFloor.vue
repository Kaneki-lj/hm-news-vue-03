<template>
  <div>
    <hm-floor
      v-if="parent.parent"
      :parent="parent.parent"
      :count="count - 1"
    ></hm-floor>
    <div class="hm-floor" :class="{ top: !parent.parent }">
      <div class="header">
        <div class="left">
          <span>{{ count }}楼</span>
          <span>{{ parent.user.nickname }}</span>
        </div>
        <div class="center">
          <div class="date">
            {{ parent.create_date | date1 }}
          </div>
        </div>
        <div class="right" @click="reply">回复</div>
      </div>
      <div class="content">{{ parent.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: ['parent', 'count'],
  methods: {
    reply() {
      this.$bus.$emit('reply',this.parent.id, this.parent.user.nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-floor {
  border: 1px solid #000;
  border-top: none;
  padding: 10px;
  &.top {
    border-top: 1px solid #000;
  }
  .header {
    display: flex;
    justify-content: space-between;
    .left {
      flex: 1;
      span {
        margin-right: 5px;
      }
    }
    .center {
      flex: 2;
      text-align: left;
      color: #999;
    }
    .right {
      width: 50px;
      text-align: center;
    }
  }
  .content {
    margin-top: 10px;
  }
}
</style>
