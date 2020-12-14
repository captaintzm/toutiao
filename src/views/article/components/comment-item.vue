<template>
<div class="comment-item">
  <van-cell>
    <van-image class="avatar" round fit="cover" :src="comment.aut_photo" slot="icon"/>
    <div slot="title">
      <div class="title-wrap">
        <div class="title">{{comment.aut_name}}</div>
        <div slot="default" class="like-wrap" @click="onCommentLike">
        <van-icon :name="comment.is_liking? 'good-job':'good-job-o'" 
        class="like-icon"
        :class="{liked:comment.is_liking}"
        />
        <span class="like-count">{{comment.like_count}}</span>
      </div>
      </div>
      <div class="content">{{comment.content}}</div>
      <div>
        <span class="pubdate">{{comment.pubdate | datetime('MM-DD HH:mm:ss')}}</span>
        <van-button round size="mini" class="reply-btn" @click="$emit('reply-click',comment)">{{comment.reply_count}}回复</van-button>
      </div>
    </div>
  </van-cell>
</div>
</template>

<script>
import {addCommentLike,deleteCommentLike} from '@/api/comments'
export default {
  name:'CommentItem',
data() {
return {

}
},
//方法集合
methods: {
  async onCommentLike(){
    const commentId = this.comment.com_id.toString()
    if(this.comment.is_liking){
       //  已点赞，取消点赞
       await deleteCommentLike(commentId)
       this.comment.like_count--
    }else{
       //没有点赞，添加点赞
       await addCommentLike(commentId)
       this.comment.like_count++
    }
    this.comment.is_liking = !this.comment.is_liking
  }
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
props:{
    comment:{
        type:Object,
        required:true
    }
}
}
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.comment-item{
  .avatar{
    width: 36px;
    height: 36px;
    margin-right: 15px;
  }
  .title{
    font-size: 14px;
    color: #406599;
  }
  .content{
    font-size: 16px;
    color: #222;
    text-align: justify;
  }
  .pubdate{
    font-size: 10px;
    float: left;
  }
  .title-wrap{
    display: flex;
    justify-content: space-between;
  }
  .like-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .like-icon.liked{
    color: #ff69b4;
  }
}
</style>