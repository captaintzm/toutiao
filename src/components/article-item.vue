<!--  -->
<template>
    <van-cell class="article-item"
      :to="{
          name:'article',
          params:{
            articleId:articleFather.art_id
          }
      }"
    >
     <div slot="title" class="title van-multi-ellipsis--l3">{{ articleFather.title}}</div>
     <div slot="label">
         <div class="cover-wrap"
          v-if="articleFather.cover.type === 3"
         >
             <div class="cover-wrap-item" v-for="img in articleFather.cover.images" :key="img">
                  <van-image
                    class="cover-item"
                    fit="cover"
                    :src="img"/>
             </div>
         </div>
         <div class="label-wrap">
         <span>{{articleFather.aut_name}}</span>
         <span>{{articleFather.comm_count}}评论</span>
         <span>{{articleFather.pubdate | relativeTime}}</span>
         </div>
     </div>
       <!-- 默认插槽名字叫default，可以省略 -->
       <van-image
        v-if="articleFather.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="articleFather.cover.images[0]"
        />
    </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
data() {
return {
   
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

},
props:{
    articleFather:{
        type:Object,
        required:true
    }
}
}
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
 .article-item{
    .title{
        font-size: 16px;
        color:#3a3a3a;
        text-align: left;
    }
    .label-wrap{
       text-align: left;
       font-size: 11px;
       color: #b4b4b4;
       span{
           margin-right: 12px;
       }
    }
  /deep/  .van-cell__value{
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }
    .right-cover{
       width: 116px;
        height: 73px; 
    }
    .cover-wrap{
        padding: 15px 0;
        display: flex;
        .cover-wrap-item{
            flex: 1;
            height: 73px;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item{
               height: 73px;
            }
        }
    }

}
</style>