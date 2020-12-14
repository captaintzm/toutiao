<template>
<div class="update-gender">
    <van-picker
    title="标题"
    :default-index = "defaultIndex"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onChange"
    />
</div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name:'updateGender',
data() {
return {
  columns:['男','女'],
  defaultIndex:this.value
}
},
props:{
    value:{
        type:Number,
        required:true,
    }
},
//方法集合
methods: {
    onChange(picker, value, index){
        this.defaultIndex = index
    },
  async onConfirm(){
   this.$toast({
       message:'保存中...',
       forbidClick:true //禁止背景点击
   })
        const {data} = await updateUserProfile({
        gender:this.defaultIndex
    })
    this.$toast.success('保存成功')
    this.$emit('input',this.defaultIndex)
    this.$emit('close')
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