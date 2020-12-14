import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/util/storage.js'
Vue.use(Vuex)

const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY), //当前登录用户的登录状态（里面有token等数据）
    catchPages:['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    //为了防止页面刷新数据丢失,我们需要把数据放到本地存储中，这里仅仅是为了数据持久化
    setItem(USER_KEY, state.user)
    },
    // 添加缓存页面
    addCachePage(state,pageName){
      if(!state.catchPages.includes(pageName)){
        state.catchPages.push(pageName)
      }
    },
    // 删除缓存页面
    removePage(state,pageName){
       const index = state.catchPages.indexOf(pageName)
      //  indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
      // 如果没有找到匹配的字符串则返回 -1。
       if(index !== -1){
        state.catchPages.splice(index,1)
       }
    }
  },
  actions: {
  },
  modules: {
  }
})

