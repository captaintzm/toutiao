import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// 路由
import router from './router'
// vuex
import store from './store'
// 全局样式
import './styles/index.less'
//使用vant框架
import Vant from 'vant'
import 'vant/lib/index.css';

//自动设置rem基准值 （html标签字体大小)
import 'amfe-flexible'
import '@/util/dayjs'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


