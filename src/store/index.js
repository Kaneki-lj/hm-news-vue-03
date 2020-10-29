import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  // 增加home
  cache(state, payload) {
    if (!state.cacheList.includes(payload.name)) {
      state.cacheList.push(payload.name)
    }
  },
  // 删除
  uncache(state, payload) {
    if (state.cacheList.includes(payload.name)) {
      //  v 本身就是数组里面的元素 元素就是 名字
      state.cacheList = state.cacheList.filter(v => v != payload.name)
    }
  },
}

const store = new Vuex.Store({
  state: {
    cacheList: ['search'], // home
  },
  mutations,
})

export default store
