<template>
  <div class="hm-post">
    <!-- 视频图片 -->
    <div class="video-img" v-if="post.type === 2">
      <div class="title line2">
        {{ post.title }}
      </div>
      <div class="imgs">
        <img :src="flxedURL(post.cover[0].url)" alt="" />
        <div class="play">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comments.length }}跟帖</span>
      </div>
    </div>
    <!-- 单张图片 -->
    <div class="single-img-post" v-else-if="post.cover.length < 3">
      <div class="left">
        <div class="title line2">
          {{ post.title }}
        </div>
        <div class="bottom">
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comments.length }}跟帖</span>
        </div>
      </div>
      <div class="right">
        <img :src="flxedURL(post.cover[0].url)" alt="" />
      </div>
    </div>
    <!-- 三张图片 -->
    <div class="many-img-post" v-else>
      <div class="title line2">
        {{ post.title }}
      </div>
      <div class="imgs">
        <img :src="flxedURL(post.cover[0].url)" alt="" />
        <img :src="flxedURL(post.cover[1].url)" alt="" />
        <img :src="flxedURL(post.cover[2].url)" alt="" />
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comments.length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    flxedURL(url) {
      if(url.startsWith('http')){
        return url
      }else{
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 14px;
  line-height: 20px;
}
.bottom {
  span {
    color: #999;
    margin-right: 10px;
  }
}
.video-img {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  .imgs {
    padding-top: 10px;
    position: relative;
    img {
      width: 340px;
      height: 170px;
      object-fit: cover;
    }
    .play {
      width: 60px;
      height: 60px;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
      line-height: 60px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .iconfont {
      font-size: 26px;
      color: #fff;
    }
  }
}

.single-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
  }
  .right {
    img {
      width: 110px;
      height: 75px;
      object-fit: cover;
    }
  }
}

.many-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      width: 110px;
      height: 75px;
      object-fit: cover;
    }
  }
}
</style>
