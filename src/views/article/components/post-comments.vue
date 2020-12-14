<template>
<div class="post-comments">
    <van-field
    v-model="message"
    rows="2"
    autosize
    label="留言"
    type="textarea"
    maxlength="50"
    placeholder="请输入评论"
    show-word-limit
/>
   <van-button size="mini"
   @click="onPost"
   class="words"
   :disabled="!message"
   >发布</van-button>
</div>
</template>

<script>
import {addComment} from '@/api/comments'
export default {
data() {
return {
  message:''  //输入框内容
}
},
props:{
  target:{
      type:[Number,String,Object],
      required:true
  },
  // 如果是发布评论回复，则也需要传递文章 ID
    articleId: {
      type: [Number, String, Object],
      default: null
    }
},
//方法集合
methods: {
   async onPost(){
       this.$toast.loading({
           message:'发布中...',
           forbidClick:true //禁止背景点击
       })
     //找到数据接口
     //封装请求方法
     //请求提交数据
     const {data} = await addComment({
         target:this.target.toString(),  //评论的目标id
         content:this.message, //输入的评论内容
         art_id:this.articleId? this.articleId.toString() : null  //文章id , 对评论回复传此参数，如果是对文章进行评论不用传
     })
     //处理响应结果    
     console.log(data)
     this.$emit('post-success',data.data.new_obj)
     this.$toast.success('发布成功')
     //发布成功之后，输入框清空
     this.message = ''
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
.post-comments{
  display:flex;
  align-items: center;
  padding: 14px;
  .words{
    text-align: center;
    width: 40px;
  }
}
</style>