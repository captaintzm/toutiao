<template>
<div class="searchHistory">
    <van-cell>
        <div slot="title" class="fl">搜索历史</div>
      <div v-if="isDeleteShow">
          <span @click="$emit('updateHistorie', [])">全部删除</span>
          &nbsp;&nbsp;
          <span>完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"/>
    </van-cell>

    <van-cell v-for="(history,index) in searchHistory" :key="index" @click="onDelete(history,index)">
     <div slot="title" class="fl">{{history}}</div>
     <van-icon name="close" v-show="isDeleteShow"/> 
    </van-cell>
</div>
</template>

<script>
export default {
    name:'SearchHistory',
data() {
return {
  isDeleteShow: false, //删除的显示状态
}
},
props:{
    searchHistory:{
        type: Array,
        required:true
    }
},
//方法集合
methods: {
  onDelete(history,index){
      if(this.isDeleteShow){
          this.searchHistory.splice(index,1)
          // 持久化处理
        // 1. 修改本地存储的数据
        // 2. 请求接口删除线上的数据
        // 无论是否登录都把数据持久化到本地
        // 如果已登录，则删除线上的历史数据
        //    没有删除单个历史记录的接口
        //    只有删除所有历史记录的接口
        // setItem('searchHistory', this.searchHistories)
        return
      }else{
           // 非删除状态，展示搜索结果
      this.$emit('search', history)
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

</style>