<template>
  <div>
    <!-- 缓存组件 -->
    <keep-alive :include="cacheList">
      <!-- 出口 -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['cacheList']),
  },
}
</script>

<style>
/* .one {
  width: 200px;
  height: 200px;
  background-color: aqua;
} */
</style>
