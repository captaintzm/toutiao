<!--  -->
<template>
<div>
    <!-- 子路由出口 -->
     <!-- <keep-alive> -->
     <router-view/>
     <!-- </keep-alive> -->

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="comment-o" to="/question">问答</van-tabbar-item>
    <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="own">我的</van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
export default {
  name:'LayoutIndex',
data() {
return {
  active: 0,
}
},
//方法集合
methods: {

},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {
   this.$store.commit('addCachePage', 'LayoutIndex')
}
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>