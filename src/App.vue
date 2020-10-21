<template>
  <div>
    <!-- 缓存组件 -->
    <keep-alive include="home">
      <!-- 出口 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style>
.one {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
</style>
