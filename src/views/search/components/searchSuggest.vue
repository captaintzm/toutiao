<template>
<div class="searchSuggest">
  <van-cell
   icon="search"
   v-for="(item,index) in suggestion"
   :key="index"
   @click="$emit('search',item)"
  >
  <div slot="title" v-html="highlight(item)" class="fl"></div>
  </van-cell>
</div>
</template>

<script>
import {getSearchSuggestions} from '@/api/search'
// 使用lodash来解决函数防抖  在此项目中解决我们搜索时联想建议会多次向后端发送请求
import {debounce} from 'lodash'
export default {
    name:'SearchSuggest',
data() {
return {
   suggestion:[], //联想建议数据列表
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
    highlight(item){
        //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
      return item.replace(
        // RegExp 是正则表达式的构造函数
        //  参数1：字符串
        //  参数2：匹配模式
        //  返回值：正则对象
        //  g: 全局匹配 i: 忽略大小写 gi: 全局匹配 + 忽略大小写
          new RegExp(this.searchText,'gi'),
          `<span style='color:red'>${this.searchText}</span>`
      )
  }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
watch:{
    //属性名：要监视的数据的名称
    searchText:{
        //当数据发生变化则会执行handler处理函数（注意：handler是固定的）
        handler: debounce(async function(){
          const {data} = await getSearchSuggestions(this.searchText)
          this.suggestion = data.data.options
        },1000),
          //找到数据接口
          //请求数据接口
          //模板绑定数据
         
        
        //只要侦听开始就会被立即执行
        immediate:true
    }
}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.searchSuggest{
    /deep/ .van-cell__title{
        float: left;
    }
}
</style>