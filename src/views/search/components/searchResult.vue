<template>
<div class="searchResult">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <van-cell v-for="(article,index) in list" :key="index" :value="article.title">
    </van-cell>
    </van-list>
</div>
</template>

<script>
import {getSearchResult} from '@/api/search'
export default {
    name:'SearchResult',
data() {
return {
   list: [],
   loading: false,
   finished: false,
   page:1, //页码
   per_page:10  //每页大小
}
},
props:{
  searchText:{
    type:String,
    required:true
  }
},
//方法集合
methods: {
  async onLoad() {
      //1.请求获取数据
      const {data} = await getSearchResult({
        page:this.page, //页码
        per_page:this.per_page, //每页大小
        q:this.searchText //搜索的字符
      })
      //2.将数据放到数据列表中
       const {results} = data.data
       this.list.push(...results)
      //3.关闭本次的loading
       this.loading = false
      //4.判断是否还有数据
      if(results.length){
        //如果有，则更新获取下一页数据的页码
        this.page++
      }else{
         //如果没有，则把 finished 设置为true,关闭加载更多
         this.finished = true
      }
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
<style lang='less' scoped>
/* @import url(); 引入css类 */
.searchResult{
 position: fixed;
 top:54px;
 left: 0;
 right: 0;
 bottom: 0;
 overflow-y: auto;
}
</style>