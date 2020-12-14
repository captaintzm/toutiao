<template>
<div class="updateBirthday">
    <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel = "$emit('close')"
    @confirm="onConfirm"
    />
</div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
import dayjs from 'dayjs'
export default {
    name:'updateBirthday',
data() {
return {
  currentDate:new Date(this.value), //默认选中时间
  minDate: new Date(1900, 0, 1),
  maxDate: new Date(), 
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
        const time = dayjs(this.currentDate).format('YYYY-MM-DD')
        const {data} = await updateUserProfile({
        birthday:time
    })
    this.$toast.success('保存成功')
    this.$emit('input',time)
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