<!--  -->
<template>
<div class="home">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar">
    <van-button
        slot="title"
        class="search-btn"
        icon="search"
        type="info"
        round
        to="/search"
        size="small">搜索</van-button>
    </van-nav-bar>
    
    <!-- 文章频道列表 -->
    <van-tabs v-model="active" class="channel-tab">
    <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 父传子 -->
        <ArticleList v-bind:father="item"/>
    </van-tab>
    <!-- 为了防止小图标把其他标签挡住，这里再加一个插槽 -->
    <div slot="nav-right" class="warp-holder"></div>
    <div slot="nav-right" class="icon-tabs" @click="show=true">
         <van-icon name="wap-nav" />
    </div>
    </van-tabs>
    <!--  标签页组件有一个功能，只有你第1次查看标签页的时候才会渲染里面的内容 -->


    <van-popup 
    v-model="show" 
    position="bottom" 
    class="channel-edit" 
    closeable 
    close-icon-position="top-left" 
    style="height:100%"
    >
    <!-- $event表示传过来的参数 -->
     <ChannelEdit :userChannels="channels" @close ="show = false" 
      @update-active="active = $event" :active='active'></ChannelEdit>
    </van-popup>
</div>
</template>

<script>
import {getUserChannels} from '@/api/user'
import ArticleList from '@/components/article-list'
import ChannelEdit from './channel-edit'
import {getItem} from '@/util/storage'
export default {
    name:'Home',
data() {
return {
  active:0, //控制被激活的标签
  channels:[], //频道列表
  show:false,//控制编辑频道的显示状态
}
},
components:{
   ArticleList,
   ChannelEdit
},
//方法集合
methods: {
    //  请求获取频道数据
    async loadChannels(){
        let channels = []
        if(this.user){
           // 已登录，请求获取线上的用户频道列表数据
           const {data} = await getUserChannels()
           this.channels = data.data.channels
        }else{
           // 没有登录，判断是否有本地存储的频道列表数据
           const localChannels = getItem('user-channels')
           // 如果有本地存储的频道列表则使用
           if(localChannels){
               channels = localChannels
           }else{
               // 用户没有登录，也没有本地存储的频道，那就请求获取默认推荐的频道列表
               const {data} = await getUserChannels()
               channels = data.data.channels
           }
        }
        //把处理好的数据放到data中
                   this.channels = channels
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
 this.loadChannels()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.home{
    /deep/  .van-nav-bar__title{
          max-width:none
      }
      .search-btn{
          width: 277px;
          height: 32px;
          background: #5babfb;
          border:none;
          .van-icon{
              font-size: 16px;
          }
          .van-button__text{
              font-size: 14px;
          }
      }
      .channel-tab{
        /deep/  .van-tab{
              border-right: 1px solid #edeff3;
              border-bottom: 1px solid #edeff3;
          }
         /deep/ .van-tabs__line{
              bottom: 20px;
              width: 15px !important;
              height: 3px;
              background: #3296fa;
          }
          .warp-holder{
              width: 30px;
              flex-shrink: 0; //我是固定大小，不参与平分父级大小
          }
          .icon-tabs{
              display: flex;
              justify-content: center;
              align-items: center;
              width: 33px;
              height: 44px;
              background: #fff;
              opacity:0.9;
              position: fixed;
              right: 0;
              &:before{
                  content: '';
                  background: url('./line.png') no-repeat;
                  width: 1px;
                  height: 29px;
                  background-size: cover;
              }
          }
      }
      
}
</style>