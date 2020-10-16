// 引入 vue
import Vue from 'vue'
import App from './App.vue'

// 引入公共样式
import './styles/base.less'
// 引入字体图标
import './styles/iconfont.css'

// 引入rem适配
import 'lib-flexible'

// 引入路由
import router from './router'

// 引入子组件
import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmPost from './components/HmPost.vue'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)


// 引入vant ui组件库
import {
  Field,
  Toast,
  Cell,
  CellGroup,
  Dialog,
  Radio,
  RadioGroup,
  Uploader,
  List,
} from 'vant'

Vue.use(List)
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)

// axios 处理
import axios from 'axios'
Vue.prototype.$axios = axios

// 基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// 请求拦截器
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 删除失效token 和 id
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    // 跳转login页面
    router.push('/login')
  }
  return res
})

/* {
  headers: {
    Authorization: token,
  }
} */

// 使用moment 和过滤器 处理日期
import moment from 'moment'
Vue.filter('date', function(val, format = 'YYYY-MM-DD') {
  return moment(val).format(format)
})

// 构建vue实例
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
