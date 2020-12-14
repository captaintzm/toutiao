<template>
<div class="search-contain">
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <van-form action="/">
    <!-- Search 组件提供了 search 和 cancel 事件，search 事件在点击键盘上的搜索/回车按钮后触发，cancel 事件在点击搜索框右侧取消按钮时触发。 -->
    <van-search
    v-model="searchText"
    shape="round"
    background="#4fc08d"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch(searchText)"
    @focus="isResultShow=false"
    @cancel="$router.back()"/>
    </van-form>

   <!-- 搜索结果 -->
   <SearchResult v-if="isResultShow" :searchText="searchText"/>

   <!-- 联想建议 -->
    <SearchSuggest v-else-if="searchText" :searchText="searchText" 
    @search="onSearch"/>

    <!-- 历史记录 -->
    <SearchHistory v-else :searchHistory="searchHistory" @search="onSearch" @updateHistorie="searchHistory = $event"/>
</div>
</template>

<script>
import SearchSuggest from './components/searchSuggest'
import SearchHistory from './components/searchHistory'
import SearchResult from './components/searchResult'
import {setItem,getItem} from '@/util/storage'
export default {
    name:'SearchIndex',
data() {
return {
   searchText:'', //搜索输入框的内容
   isResultShow: false, //控制搜索的结果
   searchHistory:getItem('searchHistory') || []  //搜索历史数据
}
},
components:{
   SearchSuggest,
   SearchHistory,
   SearchResult
},
watch:{
  // 监视搜索历史记录的变化，存储到本地存储
    searchHistory () {
      setItem('searchHistory', this.searchHistory)
    }
},
//方法集合
methods: {
    onSearch(searchText){
        //把输入框设置为你要搜索的文本
      this.searchText = searchText
      
     //每搜索一次就把搜索的关键词添加到搜索历史记录里
     //并且最后一次搜索的关键词排在数组前面，关键词不可以重复
     const index = this.searchHistory.indexOf(searchText)

    if(index !== -1){
        // 把重复项删除
        this.searchHistory.splice(index,1)
    }
     //如果用户已登录，则把搜索历史记录存储到线上
     this.searchHistory.unshift(this.searchText)
     //提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
     //如果没有登录，则把搜索历史记录存储到本地
     setItem('searchHistory',this.searchHistory)
      //展示搜索结果
      this.isResultShow = true

    },
     loadSearchHistories () {
      // 因为后端帮我们存储的用户搜索历史记录太少了（只有4条）
      // 所以我们这里让后端返回的历史记录和本地的历史记录合并到一起
      // 如果用户已登录
      const searchHistory = getItem('searchHistory') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   // 合并数组： [...数组, ...数组]
      //   // 把 Set 转为数组：[...Set对象]
      //   // 数组去重：[...new Set([...数组, ...数组])
      //   searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords
      //   ])]
      // }

      this.searchHistory = searchHistory
    }
},
//生命周期 - 创建完成（访问当前this实例）
created() {
 this.loadSearchHistories()
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style lang='less'  scoped>
/* @import url(); 引入css类 */

</style>