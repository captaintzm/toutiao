<template>
<div class="updateName">
     <van-nav-bar title="修改昵称" left-text="取消" right-text="完成"
     @click-left="$emit('close')"
     @click-right="onConfirm"/>
     <div class="filed-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入昵称"
        show-word-limit
        /> 
     </div> 
</div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'updateName',
data() {
return {
 localName:this.value
}
},
props:{
  value:{
      type:String,
      required:true
  }
},
//方法集合
methods: {
 async onConfirm(){
   this.$toast({
       message:'保存中...',
       forbidClick:true //禁止背景点击
   })
   try {
         const {data} = await updateUserProfile({
         name:this.localName
        })
        this.$toast.success('保存成功')
        this.$emit('input',this.localName)
        this.$emit('close')
   } catch (error) {
       if(error && error.response && error.response.status == 409){
           this.$toast.fail('昵称已存在')
       }
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
.filed-wrap{
    padding: 10px;
}
</style>