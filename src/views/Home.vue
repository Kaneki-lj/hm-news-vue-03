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
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
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
