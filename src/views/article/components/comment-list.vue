<template>
<div class="comment-list">
    <van-cell title="全部评论"></van-cell>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <CommentItem
   v-for="(comment,index) in list" 
   :key="index"
   :comment="comment"
   @reply-click = "$emit('reply-click',$event)"
  />
</van-list>
</div>
</template>

<script>
import {getComments} from '@/api/comments'
import CommentItem from './comment-item'
export default {
    name:'CommentList',
data() {
return {
  // list: [],
  loading: false,
  finished: false,
  offset:null, //获取下一页的页码
  limit:10 //每页大小
}
},
props:{
  // 如果读取文章评论，则传递文章的id
  // 如果获取评论回复，则传递评论id
    source:{
        type:[Number,String,Object],
        required:true
    },
    // 获取文章评论，使用字符a
    // 获取评论回复，使用字符c
    type:{
      type:String,
      default:'a'
    },
    list: {
      type: Array,
      // 数组或对象的默认值必须通过函数返回
      default: () => []
    }
},
components:{
    CommentItem
},
//方法集合
methods: {
 async onLoad(){
      //1.请求获取数据
      const { data } = await getComments({
          type:this.type, //评论类型
          offset:this.offset,
          limit:this.limit,
          source:this.source.toString() //源id,文章id或评论id
      })
        this.$emit('total-count',data.data.total_count)
      //2.把数据放在列表中
      const {results} = data.data
      this.list.push(...results)
      //3.将本次的loading关闭
      this.loading = false
      //4.判断是否还有数据
      if(results.length){
       //如果有，更新获取下一页数据的页码
       this.loading = false
      }else{
          //如果没有，则将finished设置为true,不能触发加载更多
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

</style>