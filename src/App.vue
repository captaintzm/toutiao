<template>
  <div id="app">
    <!-- 路由的出口 -->
    <!-- keep-alive缓存。组件缓存，切换页面返回时，数据不变
      因为 router-view 是一级路由出口
      keep-alive 仅对该路由出口渲染的组件有效
     -->
    <keep-alive :include="catchPages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  // 写这个名字是为了在google浏览器中的vue调试工具中可以用名字搜索到
  name:'App',
  computed:{
    ...mapState(['catchPages'])
  }
}
</script>



<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
