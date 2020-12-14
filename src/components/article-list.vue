<!--  -->
<template>
<div class="article-list">
  <van-pull-refresh 
   v-model="isLoading" 
   :success-text="refreshSuccessText"
   :success-duration="1500"
   @refresh="onRefresh">

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <article-Item
          v-for="(item,index) in articles"
          :key="index"
          v-bind:articleFather="item"
        />

  </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import {getArticles} from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
    name:'ArticleList',
data() {
return {
      articles: [], //数据列表
      loading: false,
      finished: false,
      timestamp:null, //获取下一页数据的时间戳\
      isLoading:false,//下拉刷新的状态
      refreshSuccessText:'',//下拉刷新成功提示
      scrollTop: 0 // 列表滚动到顶部的距离
}
},
components:{
  ArticleItem
},
//方法集合
methods: {
  async onLoad() {
    // 1.请求数据
      const {data}  = await getArticles({
         channel_id:this.father.id,
         timestamp:this.timestamp || Date.now(), //时间戳
         with_top: 1, //是否包含置顶
      }) 
      // 2.把数据放在 list 数组中
      const {results} = data.data
      this.articles.push(...results)

      // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则会一直停留在这里
      this.loading = false

      // 4.数据全部加载完成
      if(results.length){
          //更新过去下一页数据的页码
          this.timestamp = data.data.pre_timestamp
      }else{
          // 没有数据了，把加载状态设置结束，不再触发加载更多
           this.finished = true
      }
  },
  async  onRefresh(){
     // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道 ID
        timestamp: Date.now(), // 为了大家方便学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
        with_top: 1
      })

      // 2. 把数据放到数据列表中（往顶部追加）
      const { results } = data.data
      this.articles.unshift(...results)

       // 3. 关闭刷新的状态 loading
      this.isRefreshLoading = false

      this.refreshSuccessText = `更新了${results.length}条数据`
  }
},
props:{
    father:{
        type:Object,
        required:true
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.article-list{
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto; //设置这个，不然没有滚动条
}
</style>